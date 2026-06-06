import { z } from "zod";

export const CoordinatesSchema = z.object({
    explorerDesignation: z.string().min(1, { message: "Name is required" }),
    commLink: z.string().email({ message: "Invalid email address" }),
    priorityFrequency: z.string().regex(/^\d{10}$/, { message: "Invalid phone number" }),
});

export type CoordinatesData = z.infer<typeof CoordinatesSchema>;