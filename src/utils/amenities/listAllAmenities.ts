import { amenittieSchema } from "../../schemas/accommodation";

export const listAllAmenities = async (token: Token) => {
  const response = await fetch("http://backend:8050/amenities", {
    method: "GET",
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

  const data = await response.json();

  const accommodations = await amenittieSchema
    .array()
    .parseAsync(data["amenities"]);
  return accommodations;
};