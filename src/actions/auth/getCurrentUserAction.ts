import { defineAction } from "astro:actions";
import { getCurrentUser } from "../../utils/auth/getCurrentUser";
import { getToken } from "../../utils/auth/getToken";

export const getCurrentUserAction = defineAction({
  handler: async (_, { cookies }) => {
    const token = await getToken(cookies);

    const user = await getCurrentUser(token);

    return user;
  },
});
