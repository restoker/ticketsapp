import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
if (!sql) throw new Error('No hay ninguna base de datos conectada');
export const db = drizzle(sql, { schema, logger: true });
