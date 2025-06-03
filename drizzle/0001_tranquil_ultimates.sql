ALTER TABLE "tickets" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "priority" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "clientMail" text NOT NULL;