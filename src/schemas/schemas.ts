import { z } from "zod";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";

export const guestSchema = z.object({
  ulid: z.string().ulid(),
  document: z.string().trim(),
  name: z.string().trim(),
  surname: z.string().trim(),
  country: z.string().trim(),
  phone: z
    .string()
    .trim()
    .transform((phone) => formatPhoneNumber(phone)),
});

export const creationalGuestSchema = z.object({
  document: z
    .string()
    .trim()
    .transform((document) => document.replaceAll(".", "").replaceAll("-", "")),
  name: z.string().trim(),
  surname: z.string().trim(),
  country: z.string().trim(),
  phone: z
    .string()
    .trim()
    .transform((phone) =>
      phone
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
    ),
});

export const accommodationSchema = z.object({
  ulid: z.string().ulid(),
  name: z.coerce.string().trim(),
  status: z.coerce.string().trim(),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(
    z.object({
      id: z.coerce.string().trim(),
      name: z.coerce.string().trim(),
    })
  ),
});

export const updateAccommodationSchema = z.object({
  name: z.string().trim().optional(),
  total_guests: z.coerce.number().min(1).optional(),
  single_beds: z.coerce.number().min(0).optional(),
  double_beds: z.coerce.number().min(0).optional(),
  price: z.coerce.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
});

export const creationalAccommodationSchema = z.object({
  name: z.string().trim(),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(z.string()),
});

export const bookingSchema = z.object({
  uuid: z.string().uuid(),
  locator: z.coerce.string(),
  created_at: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  status: z.string(),
  check_in: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  check_out: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  guest: guestSchema,
  accommodation: accommodationSchema,
  budget: z.coerce.number().min(0),
});

export type Booking = z.infer<typeof bookingSchema>;

export const creationalBookingSchema = z.object({
  status: z.string().default("Disponivel"),
  check_in: z.string().transform((date) => new Date(date).toISOString()),
  check_out: z.string().transform((date) => new Date(date).toISOString()),
  guest_document: z.string(), //TODO: Validação de CPF
  accommodation_id: z.coerce.number(),
  budget: z.coerce.number().min(0),
});

export const updateBookingSchema = z.object({
  status: z.string(),
  check_in: z.string().transform((date) => new Date(date).toISOString()),
  check_out: z.string().transform((date) => new Date(date).toISOString()),
  guest_document: z.string(),
  accommodation_id: z.coerce.number(),
  budget: z.coerce.number().min(0),
});
