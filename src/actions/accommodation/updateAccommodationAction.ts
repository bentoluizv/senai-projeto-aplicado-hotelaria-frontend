import { defineAction } from "astro:actions";
import { updateAccommodationSchema } from "../../schemas/accommodation";
import { updateAccommodation } from "../../utils/accommodation/updateAccommodation";
import { getToken } from "../../utils/auth/getToken";

export const updateAccommodationAction = defineAction({
  input: updateAccommodationSchema,
  handler: async (input, ctx) => {
    const updateData = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);
    const accommodation = await updateAccommodation(token, updateData);

    return accommodation;
  },
});
