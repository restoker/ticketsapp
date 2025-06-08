'use server';

import { z } from "zod";
import { db } from "../";
import { actionClient } from "../safe-action";
import { eq } from "drizzle-orm";
import { tickets } from "../schema";
import { revalidatePath } from "next/cache";

export const assignTaskAction = actionClient
    .schema(z.object({
        id: z.number(),
        agentId: z.number(),
    }))
    .action(async ({ parsedInput: { id, agentId }, ctx: { } }) => {
        try {
            console.log('El user id es:', agentId);
            console.log('El ticket id es:', id);
            // verificar si el ticket existe
            // const ticket = await db.query.tickets.findFirst({
            //     where: (tickets, { eq }) => eq(tickets.id, Number(id)),
            // });
            // if (!ticket) return { ok: false, msg: "El ticket no existe" };

            // const ticketUpdate = await db.update(tickets).set({
            //     agentId,
            //     status: 'in_progress',
            // }).where(eq(tickets.id, Number(id))).returning();

            // revalidatePath('/dashboard/gestion');
            return { ok: true, msg: "Ticket asignado exitosamente" };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: "Error al asignar el ticket" };
        }
    })
