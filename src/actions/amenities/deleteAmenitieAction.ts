import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { deleteAmenitie } from "../../utils/amenities/deleteAmenitie";
import { getToken } from "../../utils/auth/getToken";

export const deleteAmenitieAction = defineAction({
  input: z.object({ id: z.coerce.string() }),
  handler: async (input, ctx) => {
    const { id } = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);

    await deleteAmenitie(token, id);
  },
});
