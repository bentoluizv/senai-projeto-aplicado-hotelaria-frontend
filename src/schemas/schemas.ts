import { z } from "zod";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";

export const guestSchema = z.object({
  document: z.string().trim(),
  created_at: z
    .string()
    .trim()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  name: z.string().trim(),
  surname: z.string().trim(),
  country: z.string().trim(),
  phone: z
    .string()
    .trim()
    .min(10)
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
    .min(10)
    .transform((phone) =>
      phone
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
    ),
});

export const accommodationSchema = z.object({
  id: z.coerce.number(),
  created_at: z
    .string()
    .trim()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  name: z.string().trim(),
  status: z.string().trim(),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  min_nights: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(
    z.object({
      id: z.string().trim(),
      name: z.string().trim(),
    })
  ),
});

export const creationalAccommodationSchema = z.object({
  name: z.string().trim(),
  status: z.string().trim(),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  min_nights: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export const bookingSchema = z.object({
  status: z.string(),
  checkIn: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  checkOut: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  guest: guestSchema,
  accommodation: accommodationSchema,
  budget: z.coerce.number().min(0),
});

export const creationalBookingSchema = z.object({
  uuid: z.string().uuid(),
  createdAt: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  status: z.string(),
  check_in: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  check_out: z
    .string()
    .transform((datetime) => new Date(datetime).toLocaleString()),
  guest_document: z.string(), //TODO: Validação de CPF
  accommodation_id: z.coerce.number(),
  budget: z.coerce.number().min(0),
});
