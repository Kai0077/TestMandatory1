import { db } from "./db/index.js";
import { townTable } from "./db/town/schema.js";
import { sql } from "drizzle-orm";

export interface Address {
  street: string; // alphabetic characters only, 1–3 words
  number: number; // 1–999
  floor: number; // 1–99
  door: number; // 1–50
}

/** Including postal code & town name */
export interface AddressWithTown extends Address {
  postalCode: string;
  town: string;
}

/** Town entity */
export class Town {
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
export function randInt(min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new Error("randInt bounds must be finite numbers");
  if (Math.floor(min) !== min || Math.floor(max) !== max)
    throw new Error("randInt bounds must be integers");
  if (max < min) throw new Error("randInt max must be >= min");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Create a single alphabetic word of given length, first letter capitalized. */
export function randomWord(len: number): string {
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
export function randomStreetName(): string {
  const words = randInt(1, 3);
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    parts.push(randomWord(randInt(3, 12)));
  }
  return parts.join(" ");
}

/** Generators for each component under simplified constraints */
export function generateStreet(): string {
  return randomStreetName();
}

export function generateNumber(): number {
  return randInt(1, 999);
}

export function generateFloor(): number {
  return randInt(1, 99);
}

export function generateDoor(): number {
  return randInt(1, 50);
}

/** Regex validators that match the simplified constraints */
export const streetRegex = /^[A-Za-z]+(?:\s[A-Za-z]+){0,2}$/; // 1–3 words, letters only
export const numberRegex = /^(?:[1-9]\d{0,2})$/; // 1–999
export const floorRegex = /^(?:[1-9]\d?)$/; // 1–99
export const doorRegex = /^(?:[1-9]|[1-4]\d|50)$/; // 1–50

export function isValidStreet(value: string): boolean {
  return streetRegex.test(value);
}
export function isValidNumber(value: number | string): boolean {
  return numberRegex.test(String(value));
}
export function isValidFloor(value: number | string): boolean {
  return floorRegex.test(String(value));
}
export function isValidDoor(value: number | string): boolean {
  return doorRegex.test(String(value));
}

/** Validate a full Address */
export function validateAddress(addr: Address): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!isValidStreet(addr.street))
    errors.push("street must be 1–3 words with letters only (A–Z)");
  if (!isValidNumber(addr.number))
    errors.push("number must be an integer from 1 to 999");
  if (!isValidFloor(addr.floor))
    errors.push("floor must be an integer from 1 to 99");
  if (!isValidDoor(addr.door))
    errors.push("door must be an integer from 1 to 50");
  return { valid: errors.length === 0, errors };
}

/** Generate a random address following the simplified rules */
export function generateAddress(partial?: Partial<Address>): Address {
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
export async function generateAddressWithTown(): Promise<AddressWithTown> {
  const town = await getRandomTown();
  const base = generateAddress();
  return {
    ...base,
    postalCode: town.getPostalCode(),
    town: town.getName(),
  };
}
