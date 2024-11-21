import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getRefreshedToken } from "../utils/refreshToken";
import { setSecureToken } from "../utils/setSecureToken";

const token = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

const refreshTokenAction = defineAction({
  input: token,
  handler: async (input, { cookies }) => {
    const refreshToken = await getRefreshedToken(input);
    setSecureToken(cookies, refreshToken);
  },
});

export { refreshTokenAction };
