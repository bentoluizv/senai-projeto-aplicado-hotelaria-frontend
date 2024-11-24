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

export type Guest = z.infer<typeof guestSchema>;

export type CreationalGuestDTO = z.infer<typeof creationalGuestSchema>;
export type UpdateGuestDTO = z.infer<typeof updateGuestSchema>;
