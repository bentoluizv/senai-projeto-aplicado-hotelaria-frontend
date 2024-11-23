import { defineAction } from "astro:actions";
import { ulidSchema } from "../../schemas/shared";
import { findAccommodationByUlid } from "../../utils/accommodation/FindAccommodationByID";
import { getToken } from "../../utils/auth/getToken";

export const findAccommodationByIDAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const accommodation = await findAccommodationByUlid(token, ulid);

    return accommodation;
  },
});
