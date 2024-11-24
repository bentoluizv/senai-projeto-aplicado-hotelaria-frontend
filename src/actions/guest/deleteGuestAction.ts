import { defineAction } from "astro:actions";
import { ulidSchema } from "../../schemas/shared";
import { deleteGuest } from "../../utils/guest/deleteGuest";

export const deleteGuestAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    await deleteGuest(cookies, ulid);
  },
});
