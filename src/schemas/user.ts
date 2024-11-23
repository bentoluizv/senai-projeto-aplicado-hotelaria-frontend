import { z } from "astro:content";

export const userSchema = z.object({
  ulid: z.string().ulid(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});

export type User = z.infer<typeof userSchema>;
