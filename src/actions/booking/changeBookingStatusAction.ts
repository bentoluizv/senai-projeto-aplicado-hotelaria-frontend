import { defineAction } from "astro:actions";
import { updateBookingSchema } from "../../schemas/booking";
import { getToken } from "../../utils/auth/getToken";
import { changeBookingStatus } from "../../utils/booking/changeBookingStatus";

export const changeBookingStatusAction = defineAction({
  input: updateBookingSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const { status, ulid } = input;
    const token = await getToken(cookies);
    const data = await changeBookingStatus(token, ulid, status);
    return data;
  },
});
