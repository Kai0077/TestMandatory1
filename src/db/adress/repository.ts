import { db } from "../index.js";
import { adressTable } from "./schema.js";
import { eq } from "drizzle-orm";

export const addressRepository = {
  /**
   * Fetch all addresses.
   */
  async getAll() {
    return await db.select().from(adressTable).all();
  },

  /**
   * Fetch a single address by ID.
   * @param id - The address ID.
   */
  async getById(id: number) {
    return await db
      .select()
      .from(adressTable)
      .where(eq(adressTable.id, id))
      .get();
  },
};
