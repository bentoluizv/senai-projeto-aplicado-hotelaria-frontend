import { type UpdateGuestDTO } from "../../schemas/guest";

export const updateGuest = async (token: Token, updateData: UpdateGuestDTO) => {
  const response = await fetch(
    `http://backend:8050/guests/${updateData.ulid}`,
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
