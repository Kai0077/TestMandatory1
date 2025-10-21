import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

const townTable = sqliteTable("towns", {
  id: int("id").primaryKey({ autoIncrement: true }),
  postalCode: text("postal_code").notNull(),
  name: text("name").notNull(),
});

export { townTable };
