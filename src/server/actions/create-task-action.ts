'use server';

import { actionClient } from "../safe-action";
import { taskSchema } from "@/types/task-schema";
import { db } from "..";
import { tickets } from "../schema";
import { revalidatePath } from "next/cache";

export const createTaskAction = actionClient
    .schema(taskSchema)
    .action(async ({ parsedInput: { title, description, email }, ctx: { } }) => {
        try {
            // verificar si el email existe
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });
            if (!user) return { ok: false, msg: "El usuario no existe" };

            const ticket = await db.insert(tickets).values({
                title,
                description,
                clientMail: email,
                clientId: user.id,
            }).returning();

            revalidatePath("/dashboard/home");
            return { ok: true, msg: "Ticket creado exitosamente" };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: "Error al crear el ticket" };
        }
    });
