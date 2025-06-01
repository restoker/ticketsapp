import NextAuth from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/types/login-schema';
import bcrypt from 'bcryptjs';
import { db } from '.';
// import { ExtendUser } from '../../next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // authorized({ auth, request: { nextUrl } }) {
        // console.log(auth);
        // const isLoggedIn = !!auth?.user;
        // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        // if (isOnDashboard) {
        //     if (isLoggedIn) return true;
        //     return false; // Redirect unauthenticated users to login page
        // } else if (isLoggedIn) {
        //     return Response.redirect(new URL('/dashboard', nextUrl));
        // }
        // return true;
        // },
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