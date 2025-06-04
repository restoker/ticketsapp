import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres 📝" }),
    description: z.string().min(3, { message: "La descripción debe tener al menos 3 caracteres 📝" }),
    email: z.string().email({ message: 'El correo no es valido 👽' }),
});

export type TaskSchema = z.infer<typeof taskSchema>;