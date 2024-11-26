import { bookingSchema } from "../../schemas/booking";
import type { BookingListSettings } from "../../schemas/shared";

export const listAllBookings = async (
  token: Token,
  settings: BookingListSettings
) => {
  const { filter, pagination } = settings;

  const url = filter
    ? `http://backend:8050/bookings?check_in=${filter.start}&check_out=${filter.end}&page=${pagination.page}&per_page=${pagination.perPage}`
    : `http://backend:8050/bookings?page=${pagination.page}&per_page=${pagination.perPage}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    throw new Error(`Auth failed`);
  }

  if (response.status != 200) {
    throw new Error(
      `Something went wrong with your request!! Response status: ${response.status}`
    );
  }

  const data = await response.json();

  const bookings = await bookingSchema.array().parseAsync(data["bookings"]);

  return bookings;
};
