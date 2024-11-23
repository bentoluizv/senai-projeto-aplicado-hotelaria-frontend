import { defineAction } from "astro:actions";
import { getCurrentUser } from "../../utils/auth/getCurrentUser";

export const getCurrentUserAction = defineAction({
  handler: async (_, { cookies }) => {
    const tokenCookie = cookies.get("token");

    if (!tokenCookie) {
      throw new Error("Token cookie not found!");
    }
    const token = tokenCookie.json();

    const user = await getCurrentUser(token);
    return user;
  },
});
