import { defineAction } from "astro:actions";
import { listAllAmenities } from "../../utils/amenities/listAllAmenities";
import { getToken } from "../../utils/auth/getToken";

export const listAllAmenitiesAction = defineAction({
  handler: async (_, ctx) => {
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const amenities = await listAllAmenities(token);

    return amenities;
  },
});
