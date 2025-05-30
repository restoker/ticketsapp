import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: 'Ingresa un email valido 👽' }),
    password: z.string().min(5, { message: 'Password no valido' }).max(60),
});


// export type LoginType = z.infer<typeof loginSchema>;