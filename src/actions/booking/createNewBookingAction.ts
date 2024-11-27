import { defineAction } from "astro:actions";
import { creationalBookingSchema } from "../../schemas/booking";
import { getToken } from "../../utils/auth/getToken";
import { createNewBooking } from "../../utils/booking/createNewBooking";

export const createNewBookingAction = defineAction({
  input: creationalBookingSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const token = await getToken(cookies);
    const booking = await createNewBooking(token, input);
    return booking;
  },
});
