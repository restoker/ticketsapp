'use server';

import { z } from "zod";
import { actionClient } from "../safe-action";
import { db } from "..";
import { tickets } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const closeTicketAction = actionClient
    .schema(z.object({
        ticketId: z.number(),
        agentId: z.number(),

    }))
    .action(async ({ parsedInput: { ticketId, agentId } }) => {
        try {
            // verificar si el agente existe
            const agenteExiste = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, agentId),
            });
            if (!agenteExiste) return { ok: false, msg: 'El usuario no existe' };

            // verificar si el ticket existe
            const ticketExiste = await db.query.tickets.findFirst({
                where: (tickets, { eq }) => eq(tickets.id, ticketId),
            });
            if (!ticketExiste) return { ok: false, msg: 'El ticket no existe' };

            // verificar si el agente es el dueño del ticket
            if (ticketExiste.agentId !== agentId) return { ok: false, msg: 'No tienen permiso para cerrar el ticket' };

            // cerrar el ticket
            await db.update(tickets).set({
                status: 'closed',
            }).where(eq(tickets.id, ticketId));

            revalidatePath('/dashboard/task');

            return { ok: true, msg: 'Ticket cerrado exitosamente' };

        } catch (e) {
            console.log(e);
            return { ok: false, msg: 'Error al cerrar el ticket' };
        }
    })