import { defineAction } from "astro:actions";
import { getCurrentUser } from "../utils/getCurrentUser";

const getCurrentUserAction = defineAction({
  handler: async (_, { cookies }) => {
    const user = await getCurrentUser(cookies);
    return user;
  },
});

export { getCurrentUserAction };
