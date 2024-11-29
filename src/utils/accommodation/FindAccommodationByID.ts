import { accommodationSchema } from "../../schemas/accommodation";

export const findAccommodationByUlid = async (token: Token, ulid: string) => {
  const response = await fetch(`http://backend:8050/accommodations/${ulid}`, {
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

  const accommodation = await accommodationSchema.parseAsync(data);

  return accommodation;
};
