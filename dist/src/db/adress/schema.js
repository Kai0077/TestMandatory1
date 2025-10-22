import { sqliteTable, int, text, integer,
//foreignKey,
 } from "drizzle-orm/sqlite-core";
// TODO: import TownTable
const adressTable = sqliteTable("adresses", {
    id: int("id").primaryKey({ autoIncrement: true }),
    town: integer("town").notNull(),
    street: text("street").notNull(),
    number: text("number").notNull(),
    floor: text("floor").notNull(),
    door: text("door").notNull(),
});
export { adressTable };
