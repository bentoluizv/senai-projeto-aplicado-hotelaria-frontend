import { defineAction } from "astro:actions";
import { creationalGuestSchema } from "../schemas/schemas";
import { createNewGuest } from "../utils/createNewGuest";

const createNewGuestAction = defineAction({
  accept: "form",
  input: creationalGuestSchema,
  handler: async (input, ctx) => {
    const { cookies } = ctx;
    const data = await createNewGuest(cookies, input);
    return data;
  },
});

export { createNewGuestAction };
