import { defineAction } from "astro:actions";
import { creationalGuestSchema } from "../../schemas/guest";
import { createNewGuest } from "../../utils/guest/createNewGuest";

export const createNewGuestAction = defineAction({
  accept: "form",
  input: creationalGuestSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const data = await createNewGuest(cookies, input);
    return data;
  },
});
