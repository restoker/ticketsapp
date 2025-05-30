CREATE TYPE "public"."priorities" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'agent', 'admin');--> statement-breakpoint
CREATE TYPE "public"."statuses" AS ENUM('open', 'in_progress', 'closed');--> statement-breakpoint
CREATE TABLE "ticket_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"userId" integer NOT NULL,
	"ticketId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "statuses" DEFAULT 'open' NOT NULL,
	"priority" "priorities" DEFAULT 'low' NOT NULL,
	"clientId" integer NOT NULL,
	"agentId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "roles" DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ticket_comments" ADD CONSTRAINT "ticket_comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_comments" ADD CONSTRAINT "ticket_comments_ticketId_tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_clientId_users_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_agentId_users_id_fk" FOREIGN KEY ("agentId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;