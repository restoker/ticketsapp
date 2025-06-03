import { relations } from "drizzle-orm";
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
    status: StatusEnum('status').default("open"),
    priority: PriorityEnum("priority").default("low"),
    clientId: integer("clientId").notNull().references(() => users.id, { onDelete: 'cascade' }),
    clientMail: text("clientMail").notNull(),
    agentId: integer("agentId").references(() => users.id, { onDelete: 'cascade' }),
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

export const usersRelations = relations(users, ({ one, many }) => ({
    ticketsClient: many(tickets, { relationName: 'ticketsClient' }),
    ticketsAgent: many(tickets, { relationName: 'ticketsAgent' }),
    ticketComments: many(ticketComments, { relationName: 'userTicketComments' }),
}));

export const ticketsRelations = relations(tickets, ({ one, many }) => ({
    client: one(users, {
        fields: [tickets.clientId],
        references: [users.id],
        relationName: 'ticketsClient',
    }),
    agent: one(users, {
        fields: [tickets.agentId],
        references: [users.id],
        relationName: 'ticketsAgent',
    }),
    ticketComments: many(ticketComments, { relationName: 'ticketComments' }),
}));

export const ticketCommentsRelations = relations(ticketComments, ({ one }) => ({
    tickets: one(tickets, {
        fields: [ticketComments.ticketId],
        references: [tickets.id],
        relationName: 'ticketComments',
    }),
    users: one(users, {
        fields: [ticketComments.userId],
        references: [users.id],
        relationName: 'userTicketComments',
    }),
}));

