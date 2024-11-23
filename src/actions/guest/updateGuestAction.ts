import { defineAction } from "astro:actions";
import { updateGuestSchema } from "../../schemas/schemas";
import { updateGuest } from "../../utils/updateGuest";

export const updateGuestAction = defineAction({
  accept: "form",
  input: updateGuestSchema,
  handler: async (input, ctx) => {
    const updateData = input;
    const { cookies } = ctx;

    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      throw new Error("Token cookie not found");
    }

    const token = tokenCookie.json() as Token;

    const guest = await updateGuest(token, updateData);

    return guest;
  },
});
