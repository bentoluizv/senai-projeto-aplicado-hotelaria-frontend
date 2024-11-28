import type { UpdateAccommodationDTO } from "../../schemas/accommodation";

export const updateAccommodation = async (
  token: Token,
  updateData: UpdateAccommodationDTO
) => {
  const response = await fetch(
    `http://backend:8050/accommodations/${updateData.ulid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      body: JSON.stringify(updateData),
    }
  );

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const data: { message: string } = await response.json();
  return data;
};
