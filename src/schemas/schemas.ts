import { z } from "zod";

export const guestSchema = z.object({
    document: z.string(),
    created_at: z.string(),
    name: z.string(),
    surname: z.string(),
    country: z.string(),
    phone: z.string(),
});

export const creationalGuestSchema =
z.object({
    document: z.string(),
    name: z.string(),
    surname: z.string(),
    country: z.string(),
    phone: z.string(),
});

export const accommodationSchema = z.object({
    id : z.coerce.number(),
    created_at: z.string(),
    name: z.string().trim(),
    status: z.string(),
    total_guests: z.coerce.number().min(1),
    single_beds: z.coerce.number().min(0),
    double_beds: z.coerce.number().min(0),
    min_nights: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    amenities: z.array(z.object({
        id: z.string(),
        name: z.string()
    }))
});

export const creationalAccommodationSchema = z.object({
    name: z.string(),
    status: z.string(),
    total_guests: z.coerce.number().min(1),
    single_beds: z.coerce.number().min(0),
    double_beds: z.coerce.number().min(0),
    min_nights: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    amenities: z.array(z.object({
        id: z.string(),
        name: z.string()
    }))
});


export const bookingSchema = z.object({
    status: z.string().optional(),
    checkIn: z.string(),
    checkOut: z.string(),
    guest: guestSchema,
    accommodation: accommodationSchema,
    budget: z.string(),
});

export const creationalBookingSchema = z.object({
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    status: z.string().optional(),
    check_in: z.string().datetime(),
    check_out: z.string().datetime(),
    guest_document: z.string(),
    accommodation_id: z.coerce.number(),
    budget: z.string(),
});