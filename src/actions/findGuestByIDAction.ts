import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { findGuestByID } from "../utils/FindGuestByID";

const ulidSchema = z.object({
  ulid: z.string().ulid(),
});

export type ULID = z.infer<typeof ulidSchema>;

const findGuestByIDAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    const guest = await findGuestByID(cookies, ulid);

    return guest;
  },
});

export { findGuestByIDAction };
