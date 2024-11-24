import { defineAction } from "astro:actions";
import { createAmenitieSchema } from "../../schemas/accommodation";
import { createNewAmenitie } from "../../utils/amenities/createNewAmenitie";
import { getToken } from "../../utils/auth/getToken";

export const createNewAmenitieAction = defineAction({
  accept: "form",
  input: createAmenitieSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const data = await createNewAmenitie(token, input);

    return data;
  },
});
