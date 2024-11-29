import type { CreateAccommodationDTO } from "../../schemas/accommodation";

export const createNewAccommodation = async (
  token: Token,
  input: CreateAccommodationDTO
) => {
  const response = await fetch(`http://backend:8050/accommodations`, {
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

  const data: { message: string } = await response.json();
  return data;
};
