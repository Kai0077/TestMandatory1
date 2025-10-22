import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as townSchema from "./town/schema.js";
import { createClient } from "@libsql/client";
const url = process.env.DATABASE_URL || process.env.DB_FILE_NAME;
if (!url) {
    throw new Error("Missing DATABASE_URL (file:./local.db) or DB_FILE_NAME");
}
const client = createClient({ url });
export const db = drizzle(client, { schema: { ...townSchema } });
