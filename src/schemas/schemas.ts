import { z } from "zod";

export const guestSchema = z.object({
    created_at: z.string().optional(),
    document: z.string(),
    // document: z.string().refine((value) => isValidCpf(value), "Cpf Inválido"),
    name: z.string().trim().min(1, "Você deve preencher esse campo"),
    surname: z.string().trim().min(1, "Você deve preencher esse campo"),
    country: z.string().trim().min(1, "Você deve preencher esse campo"),
    phone: z.string().trim().min(1, "Você deve preencher esse campo"),
});

export const accommodationSchema = z.object({
    id : z.coerce.number().optional(),
    created_at: z.string().optional(),
    name: z.string().trim().min(1, "Você deve preencher esse campo"),
    status: z.string().optional(),
    total_guests: z.coerce.number().min(1, "Total de hóspedes não pode  ser menor que um"),
    single_beds: z.coerce.number().min(0, "Quantidade inválida"),
    double_beds: z.coerce.number().min(0, "Quantidade inválida"),
    min_nights: z.coerce.number().min(0, "Quantidade inválida"),
    price: z.coerce.number().min(0, "Preço Inválido"),
    amenities: z.array(z.string())
});

export const bookingSchema = z.object({
    uuid: z.string().uuid("Not UUID").optional(),
    created_at: z.string().optional(),
    status: z.string().optional(),
    checkIn: z.string(),
    checkOut: z.string(),
    guest: guestSchema,
    accommodation: accommodationSchema
})