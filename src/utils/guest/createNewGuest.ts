import type { AstroCookies } from "astro";
import { type CreationalGuestDTO } from "../../schemas/guest";

export const createNewGuest = async (
  cookies: AstroCookies,
  input: CreationalGuestDTO
) => {
  const token = cookies.get("token")?.json() as Token;

  const response = await fetch(`http://backend:8050/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
    body: JSON.stringify(input),
  });

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 201) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const data = await response.json();
  return data;
};
