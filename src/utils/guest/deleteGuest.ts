import type { AstroCookies } from "astro";

export const deleteGuest = async (cookies: AstroCookies, ulid: string) => {
  const token = cookies.get("token")?.json() as Token;

  const response = await fetch(`http://backend:8050/guests/${ulid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    throw new Error(`Auth failed`);
  }

  if (response.status != 200) {
    throw new Error(
      `Something went wrong with your request!! Response status: ${response.status}`
    );
  }
};
