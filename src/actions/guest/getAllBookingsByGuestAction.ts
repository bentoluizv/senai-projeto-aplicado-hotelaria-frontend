import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getToken } from "../../utils/auth/getToken";
import { getAllBookingsByGuest } from "../../utils/guest/getAllGBookingsByGuest";

export const getAllBookingsByGuestAction = defineAction({
  input: z.string().ulid(),
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const token = await getToken(cookies);
    const guests = await getAllBookingsByGuest(token, input);
    return guests;
  },
});
