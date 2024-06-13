import { z } from "zod";
import { isValidCpf } from "../utils/isValidCpf";

export const guestSchema = z.object({
    created_at: z.string().datetime("Data Inválida").optional(),
    document: z.string().refine((value) => isValidCpf(value), "Cpf Inválido"),
    name: z.string().trim().min(1, "Você deve preencher esse campo"),
    surname: z.string().trim().min(1, "Você deve preencher esse campo"),
    country: z.string().trim().min(1, "Você deve preencher esse campo"),
    phone: z.string().trim().min(1, "Você deve preencher esse campo"),
});

export const accommodationSchema = z.object({
    id : z.number().optional(),
    created_at: z.string().optional(),
    name: z.string().trim().min(1, "Você deve preencher esse campo"),
    status: z.string().optional(),
    total_guests: z.number().min(1, "Total de hóspedes não pode  ser menor que um"),
    single_beds: z.number().min(0, "Quantidade inválida"),
    double_beds: z.number().min(0, "Quantidade inválida"),
    min_nights: z.number().min(0, "Quantidade inválida"),
    price: z.number().min(0, "Preço Inválido").transform((price) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(price)),
    amenities: z.array(z.string())
});

export const bookingSchema = z.object({
    uuid: z.string().uuid("Not UUID").optional(),
    created_at: z.string().datetime("Data Inválida"),
    status: z.string().trim().min(1, "Você deve preencher esse campo").optional(),
    checkIn: z.string().datetime("Data Inválida"),
    checkOut: z.string().datetime("Data Inválida"),
    guest: guestSchema,
    accommodation: accommodationSchema
})