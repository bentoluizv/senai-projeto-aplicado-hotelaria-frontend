import { defineAction } from "astro:actions";
import { ulidSchema } from "../../schemas/shared";
import { deleteAccommodation } from "../../utils/accommodation/deleteAccommodation";
import { getToken } from "../../utils/auth/getToken";

export const deleteAccommodationAction = defineAction({
  input: ulidSchema,
  handler: async (input, ctx) => {
    const { ulid } = input;
    const { cookies } = ctx;

    const token = await getToken(cookies);

    await deleteAccommodation(token, ulid);
  },
});
