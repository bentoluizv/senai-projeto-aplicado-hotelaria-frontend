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
    throw new Error(`Auth failed`);
  }

  if (response.status != 200) {
    throw new Error(
      `Something went wrong with your request!! Response status: ${response.status}`
    );
  }

  const data: { message: string } = await response.json();
  return data;
};
