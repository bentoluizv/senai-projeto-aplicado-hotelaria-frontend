import type { UpdateBookingDTO } from "../../schemas/booking";

export const changeBookingStatus = async (
  token: Token,
  updateData: UpdateBookingDTO
) => {
  const response = await fetch(
    `http://backend:8050/bookings/${updateData.ulid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
        body: JSON.stringify({ status: updateData.status }),
      },
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

  const data = await response.json();

  return data;
};
