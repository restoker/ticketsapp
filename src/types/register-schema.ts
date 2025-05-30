import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string()
        .min(5, { message: "El password debe tener al menos 5 caracteres" })
        .max(50, { message: "El password debe tener menos de 50 caracteres" }),
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
});