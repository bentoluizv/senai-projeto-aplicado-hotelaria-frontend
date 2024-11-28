import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getRefreshedToken } from "../../utils/auth/refreshToken";
import { setSecureToken } from "../../utils/auth/setSecureToken";

const token = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const refreshTokenAction = defineAction({
  input: token,
  handler: async (input, { cookies }) => {
    const refreshToken = await getRefreshedToken(input);

    setSecureToken(cookies, refreshToken);

    return refreshToken;
  },
});
