import { pgEnum } from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("roles", ["user", "agent", "admin"]);

