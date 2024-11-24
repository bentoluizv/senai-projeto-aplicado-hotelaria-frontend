import { defineAction } from "astro:actions";
import { ulidSchema } from "../../schemas/shared";
import { findGuestByID } from "../../utils/guest/FindGuestByID";

export const findGuestByIDAction = defineAction({
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
