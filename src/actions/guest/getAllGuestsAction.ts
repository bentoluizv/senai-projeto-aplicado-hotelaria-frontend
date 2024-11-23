import { defineAction } from "astro:actions";
import { getAllGuests } from "../../utils/guest/getAllGuests";

const getAllGuestsAction = defineAction({
  handler: async (_, ctx) => {
    const { cookies } = ctx;
    const guests = await getAllGuests(cookies);
    return guests;
  },
});

export { getAllGuestsAction };
