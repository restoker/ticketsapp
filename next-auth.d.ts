import NextAuth, { DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession['user'] & {
    id: string;
    name: string;
    email: string;
    role: "user" | "agent" | "admin";
}

declare module "next-auth" {
    interface Session {
        user: ExtendUser;
    }
}