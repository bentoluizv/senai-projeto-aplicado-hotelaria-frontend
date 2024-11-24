import { z } from "astro:content";
import { accommodationSchema } from "./accommodation";
import { guestSchema } from "./guest";

const statusEnum = z.enum([
  "pre-booked",
  "booked",
  "waiting check-in",
  "active",
  "waiting check-out",
  "completed",
  "canceled",
]);

const statusEnumPtBr = z.enum([
  "pré-reserva",
  "reservado",
  "aguardando check-in",
  "ativa",
  "aguardando check-out",
  "finalizada",
  "cancelada",
]);

type status =
  | "pre-booked"
  | "booked"
  | "waiting check-in"
  | "active"
  | "waiting check-out"
  | "completed"
  | "canceled";

type statusPtBr =
  | "pré-reserva"
  | "reservado"
  | "aguardando check-in"
  | "ativa"
  | "aguardando check-out"
  | "finalizada"
  | "cancelada";

type TranlateMatrix = [status, statusPtBr];
const translateMatrix: TranlateMatrix[] = [
  ["pre-booked", "pré-reserva"],
  ["booked", "reservado"],
  ["waiting check-in", "aguardando check-in"],
  ["active", "ativa"],
  ["waiting check-out", "aguardando check-out"],
  ["completed", "finalizada"],
  ["canceled", "cancelada"],
];

export const bookingSchema = z.object({
  ulid: z.string().ulid(),
  locator: z.coerce.string(),
  status: statusEnum.transform((value) =>
    translateMatrix.map((status) =>
      status[0] == value ? status[1] : status[1]
    )
  ),
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
  status: statusEnum,
});
export const listAllBookingsInputSchema = z.object({
  ulid: z.string().ulid(),
  status: statusEnumPtBr.transform((value) => undefined),
});

export type Booking = z.infer<typeof bookingSchema>;
export type CreateBookingDTO = z.infer<typeof creationalBookingSchema>;
export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;
