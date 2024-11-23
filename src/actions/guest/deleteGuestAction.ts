import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { deleteGuest } from "../../utils/guest/deleteGuest";

const ulidSchema = z.object({
  ulid: z.string().ulid(),
});

export type ULID = z.infer<typeof ulidSchema>;

export const deleteGuestAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    await deleteGuest(cookies, ulid);
  },
});
