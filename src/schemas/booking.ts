import { z } from "astro:content";
import { accommodationSchema, guestSchema } from "./guest";

export const bookingSchema = z.object({
  ulid: z.string().ulid(),
  locator: z.coerce.string(),
  status: z.string(),
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

export type Booking = z.infer<typeof bookingSchema>;

export const creationalBookingSchema = z.object({
  check_in: z.string().transform((date) => new Date(date).toISOString()),
  check_out: z.string().transform((date) => new Date(date).toISOString()),
  guest_document: z.string(),
  accommodation_ulid: z.string(),
});
