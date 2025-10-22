import { db } from "./db/index.js";
import { townTable } from "./db/town/schema.js";
import { sql } from "drizzle-orm";

interface Address {
  street: string; // alphabetic characters only, 1–3 words
  number: number; // 1–999
  floor: number; // 1–99
  door: number; // 1–50
}

/** Including postal code & town name */
interface AddressWithTown extends Address {
  postalCode: string;
  town: string;
}

/** Town entity */
class Town {
  #id: number;
  #postalCode: string;
  #name: string;

  constructor(id: number, postalCode: string, name: string) {
    this.#id = id;
    this.#postalCode = postalCode;
    this.#name = name;
  }
  getID() {
    return this.#id;
  }
  getPostalCode() {
    return this.#postalCode;
  }
  getName() {
    return this.#name;
  }
  setPostalCode(postalCode: string) {
    this.#postalCode = postalCode;
  }
  setName(name: string) {
    this.#name = name;
  }
}

/** Utility: random integer in [min, max] */
function randInt(min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new Error("randInt bounds must be finite numbers");
  if (Math.floor(min) !== min || Math.floor(max) !== max)
    throw new Error("randInt bounds must be integers");
  if (max < min) throw new Error("randInt max must be >= min");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Create a single alphabetic word of given length, first letter capitalized. */
function randomWord(len: number): string {
  if (len < 1) throw new Error("word length must be >= 1");
  const letters = [] as string[];
  for (let i = 0; i < len; i++) {
    const code = randInt(97, 122); // a-z
    letters.push(String.fromCharCode(code));
  }
  const word = letters.join("");
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Create a street name: 1–3 alphabetic words, each 3–12 chars. */
function randomStreetName(): string {
  const words = randInt(1, 3);
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    parts.push(randomWord(randInt(3, 12)));
  }
  return parts.join(" ");
}

/** Generators for each component under simplified constraints */
function generateStreet(): string {
  return randomStreetName();
}

function generateNumber(): number {
  return randInt(1, 999);
}

function generateFloor(): number {
  return randInt(1, 99);
}

function generateDoor(): number {
  return randInt(1, 50);
}

/** Generate a random address following the simplified rules */
function generateAddress(partial?: Partial<Address>): Address {
  const addr: Address = {
    street: partial?.street ?? generateStreet(),
    number: partial?.number ?? generateNumber(),
    floor: partial?.floor ?? generateFloor(),
    door: partial?.door ?? generateDoor(),
  };
  return addr;
}

/** Print an address single line format */
export function addressToString(addr: Address): string {
  return `${addr.street} ${addr.number}, ${addr.floor}. ${addr.door}`;
}

export async function getRandomTown(): Promise<Town> {
  try {
    const rows = await db
      .select()
      .from(townTable)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    if (rows.length === 0) throw new Error("No towns in database");
    const r = rows[0];
    return new Town(r.id, String(r.postalCode), String(r.name));
  } catch (e) {
    console.log(e);
    /* fall through to next approach */
  }

  try {
    const rows = await db.query.townTable.findMany({ limit: 1 });
    if (rows.length === 0) throw new Error("No towns in database");
    const r = rows[0];
    return new Town(r.id, String(r.postalCode), String(r.name));
  } catch (err) {
    console.log(err);
  }

  throw new Error(
    "Unsupported DB interface: pass a Drizzle DB with select() or query.*.findMany()",
  );
}

/**
 * Generate a full Address including a random town+postalCode from DB.
 */
async function generateAddressWithTown(): Promise<AddressWithTown> {
  const town = await getRandomTown();
  const base = generateAddress();
  return {
    ...base,
    postalCode: town.getPostalCode(),
    town: town.getName(),
  };
}

export { generateAddress, generateAddressWithTown };
export type { Address, AddressWithTown };
