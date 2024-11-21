import type { AstroCookies } from "astro";

type User = {
  ulid: string;
  email: string;
  role: string;
};

export const getCurrentUser = async (cookies: AstroCookies) => {
  const jwtToken = cookies.get("token")?.json() as TokenWithExp;

  if (!jwtToken) {
    throw new Error("Token Not Found");
  }

  const response = await fetch("http://backend:8050/auth/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwtToken.token_type} ${jwtToken.access_token}`,
    },
  });

  const currentUser = await response.json();

  return currentUser as User;
};
