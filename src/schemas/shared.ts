import { z } from "zod";

export const ulidSchema = z.object({
  ulid: z.string().ulid(),
});

export type ULID = z.infer<typeof ulidSchema>;
