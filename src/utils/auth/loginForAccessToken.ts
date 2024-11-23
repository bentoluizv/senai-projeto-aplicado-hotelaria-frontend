import type { AstroCookies } from "astro";

export const loginForAccessToken = async (
  data: URLSearchParams,
  cookies: AstroCookies
) => {
  const response = await fetch("http://backend:8050/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Login failed:", error);
    throw new Error(error.detail || "Authentication failed");
  }

  const jwt = (await response.json()) as Token;
  return jwt;
};
