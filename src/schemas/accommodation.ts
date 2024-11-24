import { z } from "astro:content";

const statusEnum = z.enum(["avaiable", "ocupied"]);

const statusEnumPtBr = z.enum(["disponível", "ocupado"]);

type status = z.infer<typeof statusEnum>;

type statusPtBr = z.infer<typeof statusEnumPtBr>;

const translateMatrix: [status, statusPtBr][] = [
  ["avaiable", "disponível"],
  ["ocupied", "ocupado"],
];

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
  status: statusEnum.transform((value) =>
    translateStatus("pt-br", value, translateMatrix)
  ),
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
  status: statusEnumPtBr.transform((value) =>
    translateStatus("en", value, translateMatrix)
  ),
});

export const creationalAccommodationSchema = z.object({
  name: z.string().trim(),
  status: statusEnum.default("avaiable"),
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

function translateStatus(
  to: "pt-br" | "en",
  value: status | statusPtBr,
  translateMatrix: [status, statusPtBr][]
): status | statusPtBr {
  switch (to) {
    case "pt-br": {
      const translation = translateMatrix.find(([status]) => status === value);

      if (!translation) {
        throw new Error(`Translation for ${value} not found in pt-br`);
      }
      return translation[1];
    }
    case "en": {
      const translation = translateMatrix.find(
        ([, statusPtBr]) => statusPtBr === value
      );

      if (!translation) {
        throw new Error(`Translation for ${value} not found in en`);
      }

      return translation[0];
    }
    default: {
      throw new Error("Invalid language code");
    }
  }
}
