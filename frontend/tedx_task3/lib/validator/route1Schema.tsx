import { z } from "zod"

export const RouteSchema_1 = z.object({
    hostel: z.string().min(1, { message: "Hostel is required" }),
    room: z.string().min(1, { message: "Room is required" }),
    notes: z.string().optional(),
})

export type RouteData_1 = z.infer<typeof RouteSchema_1>;