import type { AstroCookies } from "astro";

export const getToken = async (cookies: AstroCookies) => {
  const tokenCookie = cookies.get("token");

  if (!tokenCookie) {
    throw new Error("Token cookie not found!");
  }

  const token: Token = tokenCookie.json();

  return token;
};
