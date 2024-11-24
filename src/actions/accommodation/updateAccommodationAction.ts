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
    console.log("input data to update", updateData);
    const accommodation = await updateAccommodation(token, updateData);
    console.log("response:", accommodation);
    return accommodation;
  },
});
