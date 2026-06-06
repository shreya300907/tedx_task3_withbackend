import { z } from "zod"

export const RouteSchema_2 = z.object({
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    pin: z.string().regex(/^\d{6}$/, { message: "Invalid Pin Code" })
})

export type RouteData_2 = z.infer<typeof RouteSchema_2>;