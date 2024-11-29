import { z } from "astro:content";

export const amenittieSchema = z.object({
  id: z.coerce.string().trim(),
  name: z.coerce.string().trim(),
});

export const createAmenitieSchema = z.object({
  name: z.coerce.string().trim(),
});

export const accommodationSchema = z.object({
  ulid: z.string().ulid(),
  name: z.coerce.string().trim(),
  status: z.enum(["disponivel", "ocupado"]),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(amenittieSchema),
});

export const updateAccommodationSchema = z.object({
  ulid: z.string().ulid(),
  name: z.string().trim().optional(),
  total_guests: z.coerce.number().min(1).optional(),
  single_beds: z.coerce.number().min(0).optional(),
  double_beds: z.coerce.number().min(0).optional(),
  price: z.coerce.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(["disponivel", "ocupado"]).optional(),
});

export const creationalAccommodationSchema = z.object({
  name: z.string().trim(),
  status: z.enum(["disponivel", "ocupado"]).default("disponivel"),
  total_guests: z.coerce.number().min(1),
  single_beds: z.coerce.number().min(0),
  double_beds: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  amenities: z.array(z.string()),
});

export type Accommodation = z.infer<typeof accommodationSchema>;
export type Amenitie = z.infer<typeof amenittieSchema>;
export type UpdateAccommodationDTO = z.infer<typeof updateAccommodationSchema>;
export type CreateAmenitieDTO = z.infer<typeof createAmenitieSchema>;
export type CreateAccommodationDTO = z.infer<
  typeof creationalAccommodationSchema
>;
