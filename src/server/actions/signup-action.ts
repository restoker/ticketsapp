'use server';

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "../safe-action";
import { db } from "..";
import bcrypt from "bcryptjs";
import { users } from "../schema";


export const registerAction = actionClient
    .schema(registerSchema)
    .action(async ({ parsedInput: { email, password, name }, ctx: { } }) => {
        try {
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });

            if (user) return { ok: false, msg: 'El usuario ya existe' };

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.insert(users).values({
                name,
                email,
                password: hashedPassword,
            });
            return { ok: true, msg: `Su cuenta se ha creado exitosamente` };
        } catch (error) {
            return { ok: false, msg: 'Error al crear la cuenta' };
        }
    })