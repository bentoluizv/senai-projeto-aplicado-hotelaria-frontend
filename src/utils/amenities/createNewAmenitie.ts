import type { CreateAmenitieDTO } from "../../schemas/accommodation";

export const createNewAmenitie = async (
  token: Token,
  input: CreateAmenitieDTO
) => {
  const response = await fetch(`http://backend:8050/amenities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
    body: JSON.stringify(input),
  });

  if (response.status == 401) {
    throw new Error(`Auth failed`);
  }

  if (response.status != 201) {
    throw new Error(
      `Something went wrong with your request!! Response status: ${response.status}`
    );
  }

  const data: { message: string } = await response.json();
  return data;
};
