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
    const error = await response.json();
    throw new Error(error.detail || `Auth failed`);
  }

  if (response.status != 201) {
    const error = await response.json();
    throw new Error(error.detail || "Não foi possível criar uma nova reserva");
  }

  const data = await response.json();

  const booking = await bookingSchema.parseAsync(data);

  return booking;
};
