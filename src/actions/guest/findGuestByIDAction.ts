import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { findGuestByID } from "../../utils/guest/FindGuestByID";

const ulidSchema = z.object({
  ulid: z.string().ulid(),
});

export type ULID = z.infer<typeof ulidSchema>;

const findGuestByIDAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      throw new Error("Token cookie not found");
    }

    const token = tokenCookie.json() as Token;

    const guest = await findGuestByID(token, ulid);

    return guest;
  },
});

export { findGuestByIDAction };
