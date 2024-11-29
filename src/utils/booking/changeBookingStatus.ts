export const changeBookingStatus = async (
  token: Token,
  ulid: string,
  status: string
) => {
  const url = `http://backend:8050/bookings/${ulid}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 200) {
    const error = await response.json();

    throw new Error(
      error.detail || "Não foi possível mudar o status da reserva"
    );
  }

  const data = await response.json();

  return data;
};
