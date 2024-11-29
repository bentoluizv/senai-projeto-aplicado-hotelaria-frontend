import { bookingSchema } from "../../schemas/booking";

export const findBookingById = async (token: Token, ulid: string) => {
  const response = await fetch(`http://backend:8050/bookings/${ulid}`, {
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
    throw new Error(error.detail);
  }

  const data = await response.json();

  const booking = await bookingSchema.parseAsync(data);

  return booking;
};
