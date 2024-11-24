import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { findAmenitieById } from "../../utils/amenities/FindAmenitieByID";
import { getToken } from "../../utils/auth/getToken";

const idSchema = z.object({ id: z.string() });

export type ID = z.infer<typeof idSchema>;

export const findAmenitieByIdAction = defineAction({
  input: z.object({ id: z.string() }),
  handler: async (input, ctx) => {
    const { id } = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const accommodation = await findAmenitieById(token, id);

    return accommodation;
  },
});
