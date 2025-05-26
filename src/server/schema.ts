import { pgEnum, pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("roles", ["user", "agent", "admin"]);

export const StatusEnum = pgEnum("statuses", ["open", "in_progress", "closed"]);

export const PriorityEnum = pgEnum("priorities", ["low", "medium", "high"]);

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: RoleEnum("role").notNull().default("user"),
});

export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: StatusEnum('status').notNull().default("open"),
    priority: PriorityEnum("priority").notNull().default("low"),
    clientId: integer("clientId").notNull().references(() => users.id, { onDelete: 'cascade' }),
    agentId: integer("agentId").notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

export const ticketComments = pgTable("ticket_comments", {
    id: serial("id").primaryKey(),
    comment: text("comment").notNull(),
    userId: integer("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
    ticketId: integer("ticketId").notNull().references(() => tickets.id, { onDelete: 'cascade' }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});




