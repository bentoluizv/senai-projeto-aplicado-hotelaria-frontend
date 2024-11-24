import { defineAction } from "astro:actions";
import { creationalAccommodationSchema } from "../../schemas/accommodation";
import { createNewAccommodation } from "../../utils/accommodation/createNewAccommodation";
import { getToken } from "../../utils/auth/getToken";

export const createNewAccommodationAction = defineAction({
  input: creationalAccommodationSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const data = await createNewAccommodation(token, input);

    return data;
  },
});
