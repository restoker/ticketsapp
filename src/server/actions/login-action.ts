'use server';

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "../safe-action";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { db } from "..";

export const loginAction = actionClient
    .schema(loginSchema)
    .action(async ({ parsedInput: { email, password }, ctx: { } }) => {
        try {
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });

            if (!user) return { ok: false, msg: 'Usuario o contraseña incorrectas' }

            const passwordCorrect = await bcrypt.compare(password, user.password);
            if (!passwordCorrect) return { ok: false, msg: 'Usuario o contraseña incorrectos' };
            await signIn('credentials', {
                ...{ email, password },
                redirect: false,
            });
            const { password: Elpassword, ...rest } = user;
            return { ok: true, msg: `Bienvenido nuevamente ${user.name}`, data: rest };
        } catch (e) {
            if (e instanceof AuthError) {
                switch (e.type) {
                    case 'CredentialsSignin':
                        return { ok: false, msg: 'Invalid credentials.' };
                    case 'AccessDenied':
                        return { ok: false, msg: e.message };
                    case 'OAuthSignInError':
                        return { ok: false, msg: e.message };

                    default:
                        return { ok: false, msg: 'Something went wrong' };
                }
            }
            return { ok: false, msg: 'Error on server ' };
        }
    })