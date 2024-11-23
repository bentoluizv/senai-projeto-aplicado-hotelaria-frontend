import { z } from "astro:content";
import { transformPhone } from "../utils/transformPhone";

export const guestSchema = z.object({
  ulid: z.string().ulid(),
  document: z.string().trim(),
  name: z.string().trim(),
  surname: z.string().trim(),
  country: z.string().trim(),
  phone: z.string().trim(),
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
    .transform((phone) => transformPhone(phone)),
});

export const updateGuestSchema = z.object({
  ulid: z.string().ulid(),
  document: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  country: z.string().optional(),
  phone: z
    .string()
    .optional()
    .transform((phone) => (phone ? transformPhone(phone) : undefined)),
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

export type Guest = z.infer<typeof guestSchema>;

export type CreationalGuestDTO = z.infer<typeof creationalGuestSchema>;
export type UpdateGuestDTO = z.infer<typeof updateGuestSchema>;
