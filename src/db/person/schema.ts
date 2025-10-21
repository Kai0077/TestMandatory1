import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

const personTable = sqliteTable("persons", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  cpr: text("cpr").notNull(),
  //address: text("address").notNull(),
  phone: text("phone").notNull(),
  birthdate: int("birthdate", { mode: "timestamp_ms" }).notNull(),
});