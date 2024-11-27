import { bookingSchema, type CreateBookingDTO } from "../../schemas/booking";

export const createNewBooking = async (
  token: Token,
  input: CreateBookingDTO
) => {
  const response = await fetch(`http://backend:8050/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
    body: JSON.stringify(input),
  });

  if (response.status == 401) {
    throw new Error(`Auth failed`);
  }

  if (response.status != 201) {
    const data = await response.json();
    console.log(data.detail);
    throw new Error("Unable to create a new booking");
  }

  const data = await response.json();

  const booking = await bookingSchema.parseAsync(data);

  return booking;
};
