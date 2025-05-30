import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
if (!sql) throw new Error('No hay ninguna base de datos conectada');
export const db = drizzle(sql, { schema, logger: true });


// npx drizzle-kit generate
// npx drizzle-kit migrate
// npx drizzle-kit push
// npx drizzle-kit studio
// npx drizzle-kit studio --host 0.0.0.0
// npx drizzle-kit pull
// npx drizzle-kit check
// npx drizzle-kit up
