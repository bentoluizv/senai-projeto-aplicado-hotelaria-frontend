import { defineAction } from "astro:actions";
import { getAllAccommodations } from "../../utils/accommodation/getAllAccommodations";
import { getToken } from "../../utils/auth/getToken";

export const getAllAccommodationsAction = defineAction({
  handler: async (_, ctx) => {
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const accommodations = await getAllAccommodations(token);

    return accommodations;
  },
});
