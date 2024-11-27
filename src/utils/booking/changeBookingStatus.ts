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
    throw new Error(`Auth failed`);
  }

  if (response.status != 200) {
    const data = await response.json();
    console.log(data.detail);
    throw new Error("Unable to create a new booking");
  }

  const data = await response.json();

  return data;
};
