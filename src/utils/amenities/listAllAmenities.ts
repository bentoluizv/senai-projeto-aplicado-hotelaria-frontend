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
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail || "Unable to fetch Amenities");
  }

  const data = await response.json();

  const amenities = await amenittieSchema.array().parseAsync(data["amenities"]);
  return amenities;
};
