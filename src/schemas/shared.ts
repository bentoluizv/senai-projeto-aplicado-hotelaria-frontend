import { z } from "zod";

export const ulidSchema = z.object({
  ulid: z.string().ulid(),
});

export type ULID = z.infer<typeof ulidSchema>;

const pagination = z.object({
  page: z.number(),
  perPage: z.number(),
});

const filter = z
  .object({
    start: z.string().date(),
    end: z.string().date(),
  })
  .optional();

export const bookingListSettingsSchema = z.object({
  pagination,
  filter,
});

export type BookingListSettings = z.infer<typeof bookingListSettingsSchema>;
