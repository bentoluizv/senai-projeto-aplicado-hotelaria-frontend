import type { AstroCookies } from "astro";

export const setSecureToken = (cookies: AstroCookies, jwt: Token) => {
  console.log("Settings Cookie");
  if (cookies.has("token")) {
    cookies.delete("token");
  }

  cookies.set("token", jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 30,
  });
};
