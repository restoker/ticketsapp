import NextAuth from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/types/login-schema';
import bcrypt from 'bcryptjs';
import { db } from '.';
import { eq } from 'drizzle-orm';
// import { ExtendUser } from '../../next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (!token.sub) return token;
            const existUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, Number(token.sub))
            })
            if (!existUser) return token;
            // if (user) {
            //     token.isOauth = !!existsAccount;
            //     return token
            // }
            // console.log(existsAccount);
            token.name = existUser.name;
            token.email = existUser.email;
            token.role = existUser.role;

            return token;

        },
        async session({ session, user, token }) {
            console.log(user);
            if (session && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as "user" | "agent" | "admin";
            }
            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const parsedCredentials = loginSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    return null
                }
                const { email, password } = parsedCredentials.data;
                const user = await db.query.users.findFirst({
                    where: (users, { eq }) => eq(users.email, email),
                });
                if (!user) return null;
                if (!user || !user.password) return null;

                // verificar el password
                const passCorrect = await bcrypt.compare(password, user.password);

                if (!passCorrect) return null;
                const { password: otro, ...rest } = user;
                return {
                    id: rest.id.toString(),
                    name: rest.name,
                    email: rest.email,
                    role: rest.role,
                };
                // const user = await getUser(email);
                // if (!user) return null;
            },
        }),
    ],
})