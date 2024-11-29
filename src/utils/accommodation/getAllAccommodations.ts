import { accommodationSchema } from "../../schemas/accommodation";

export const getAllAccommodations = async (token: Token) => {
  const response = await fetch("http://backend:8050/accommodations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  const error = await response.json();
  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const data = await response.json();

  const accommodations = await accommodationSchema
    .array()
    .parseAsync(data["accommodations"]);
  return accommodations;
};
