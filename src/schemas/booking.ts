import { z } from "astro:content";
import { accommodationSchema } from "./accommodation";
import { guestSchema } from "./guest";

const status = z.enum([
  "pre-reserva",
  "reservado",
  "aguardando check-in",
  "ativa",
  "aguardando check-out",
  "finalizada",
  "cancelada",
]);

export const bookingSchema = z.object({
  ulid: z.string().ulid(),
  locator: z.coerce.string(),
  status: status,
  check_in: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleDateString()),
  check_out: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleDateString()),
  guest: guestSchema,
  accommodation: accommodationSchema,
  budget: z.coerce.number().min(0),
});

export const creationalBookingSchema = z.object({
  check_in: z.string().transform((date) => new Date(date).toISOString()),
  check_out: z.string().transform((date) => new Date(date).toISOString()),
  guest_document: z.string(),
  accommodation_ulid: z.string(),
});

export const updateBookingSchema = z.object({
  ulid: z.string().ulid(),
  status: status,
});
export const listAllBookingsInputSchema = z.object({
  ulid: z.string().ulid(),
  status: status,
});

export type Booking = z.infer<typeof bookingSchema>;
export type CreateBookingDTO = z.infer<typeof creationalBookingSchema>;
export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;
