'use server';

import { z } from "zod";
import { actionClient } from "../safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateRolAction = actionClient
    .schema(z.object({
        idUser: z.number(),
        role: z.enum(['user', 'agent', 'admin'])
    }))
    .action(async ({ parsedInput: { idUser, role }, ctx: { } }) => {
        try {
            //verificar si el usuario existe
            const existe = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, idUser),
            })
            if (!existe) return { ok: false, msg: 'El usuario ingresado no existe' };
            if (role === existe.role || !role) return { ok: false, msg: 'Debe agregar un rol valido' };
            await db.update(users).set({
                role,
            }).where(eq(users.id, idUser));

            revalidatePath('/dashboard/users');

            return { ok: true, msg: 'El rol del usuario se actualizo exitosamente' };

        } catch (e) {
            return { ok: false, msg: 'Error en el servidor' };
        }
    })