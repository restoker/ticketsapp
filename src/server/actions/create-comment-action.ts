"use server";

import { z } from "zod";
import { actionClient } from "../safe-action";
import { db } from "..";
import { revalidatePath } from "next/cache";
import { ticketComments } from "../schema";

export const createCommentAction = actionClient
    .schema(z.object({
        idUser: z.number(),
        comment: z.string(),
        idTicket: z.number(),
    }))
    .action(async ({ parsedInput: { idUser, comment, idTicket } }) => {
        try {

            console.log({ idUser, comment, idTicket });
            // verificar si el ticket existe
            const ticket = await db.query.tickets.findFirst({
                where: (tickets, { eq }) => eq(tickets.id, idTicket),
            });
            if (!ticket) return { ok: false, msg: 'El ticket no existe' };

            // verificar si el usuario existe
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, idUser),
            })
            if (!user) return { ok: false, msg: 'El usuario no existe' };

            // crear mensaje
            const comentarioResponse = await db.insert(ticketComments).values({
                userId: idUser,
                ticketId: idTicket,
                comment: comment,
            }).returning();
            console.log(comentarioResponse);

            revalidatePath(`/dashboard/gestion/${idTicket}`);
            return { ok: true, msg: 'Comentario creado exitosamente' };
        } catch (e) {
            console.log(e);
            return { ok: false, msg: 'Error al crear el comentario' }
        }
    })
