import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { findGuestByID } from "../../utils/guest/FindGuestByID";

export const findGuestByIDAction = defineAction({
  input: z.string(),
  handler: async (input, ctx) => {
    const { cookies } = ctx;

    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      throw new Error("Token cookie not found");
    }

    const token = tokenCookie.json() as Token;

    const guest = await findGuestByID(token, input);

    return guest;
  },
});
