import { defineAction } from "astro:actions";
import { ulidSchema } from "../../schemas/shared";
import { getToken } from "../../utils/auth/getToken";
import { findBookingById } from "../../utils/booking/FindBookingByID";

export const findBookingByIDAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const booking = await findBookingById(token, ulid);

    return booking;
  },
});
