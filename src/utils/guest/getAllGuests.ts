import type { AstroCookies } from "astro";
import { guestSchema } from "../../schemas/guest";

export const getAllGuests = async (cookies: AstroCookies) => {
  const token = cookies.get("token")?.json() as Token;

  const response = await fetch("http://backend:8050/guests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const data = await response.json();

  const guests = await guestSchema.array().parseAsync(data["guests"]);
  return guests;
};
