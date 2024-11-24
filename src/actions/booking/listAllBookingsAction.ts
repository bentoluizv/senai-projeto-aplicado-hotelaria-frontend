import { defineAction } from "astro:actions";
import { bookingListSettingsSchema } from "../../schemas/shared";
import { getToken } from "../../utils/auth/getToken";
import { listAllBookings } from "../../utils/booking/listAllBookings";

export const listAllBookingsAction = defineAction({
  input: bookingListSettingsSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;

    const token = await getToken(cookies);

    const booking = await listAllBookings(token, input);

    return booking;
  },
});
