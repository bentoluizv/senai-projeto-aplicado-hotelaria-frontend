import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getToken } from "../../utils/auth/getToken";
import { getRefreshedToken } from "../../utils/auth/refreshToken";
import { setSecureToken } from "../../utils/auth/setSecureToken";

const token = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const refreshTokenAction = defineAction({
  handler: async (_, { cookies }) => {
    const token = await getToken(cookies);

    const refreshToken = await getRefreshedToken(token);

    setSecureToken(cookies, refreshToken);

    return refreshToken;
  },
});
