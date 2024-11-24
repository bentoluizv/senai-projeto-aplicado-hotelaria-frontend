import { defineAction } from "astro:actions";
import { updateBookingSchema } from "../../schemas/booking";
import { getToken } from "../../utils/auth/getToken";
import { changeBookingStatus } from "../../utils/booking/changeBookingStatus";

export const changeBookingStatusAction = defineAction({
  accept: "form",
  input: updateBookingSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const token = await getToken(cookies);
    const data: { message: string } = await changeBookingStatus(token, input);
    return data;
  },
});
