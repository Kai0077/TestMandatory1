import { type IPerson } from "./personHandler.js";

type Result<T> = { type: "ok"; data: T } | { type: "err"; err: unknown };

// helper function to pad numbers to 2 digits for date formatting
function pad2(n: number | string): string {
  return String(n).padStart(2, "0");
}

/**
 * @description
 * Converts a birthdate from YYYY-MM-DD to DDMMYY format.
 * @param birthdate - A date string in YYYY-MM-DD format.
 * @returns The date string formatted as DDMMYY.
 */
function toDDMMYY(birthdate: string): string {
  const [yyyy, mm, dd] = birthdate.split("-");
  if (!yyyy || !mm || !dd)
    throw new Error("Invalid birthdate format, expected YYYY-MM-DD");
  const yy = yyyy.slice(-2);
  return `${pad2(dd)}${pad2(mm)}${yy}`;
}

/**
 * @description
 * Generates the middle 3 random digits for a CPR number.
 * Used internally by the CPR handler.
 * @returns A string of 3 random numeric digits.
 */
function randomDigits(): string {
  let digits = "";
  for (let i = 0; i < 3; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
}

/**
 * @description
 * Returns the last digit of the CPR number based on gender.
 * In Denmark:
 * - Females have an even last digit.
 * - Males have an odd last digit.
 * @param gender - The person's gender ("male" | "female").
 * @returns The corresponding CPR gender digit.
 */
function genderLastDigit(gender: IPerson["gender"]): string {
  const possibleDigits =
    gender === "female" ? [0, 2, 4, 6, 8] : [1, 3, 5, 7, 9];
  const index = Math.floor(Math.random() * possibleDigits.length);
  return String(possibleDigits[index]);
}

/**
 * @description
 * createCpr creates a CPR number for a given person.
 * The format is DDMMYYXXXG, where:
 * - DDMMYY = birthdate (day, month, year)
 * - XXX = 3 random digits
 * - G = gender digit (even=female, odd=male)
 * @param person - The person object containing birthdate and gender.
 * @returns A result type containing either the CPR string or an unknown error.
 */
function createCpr(person: IPerson): Result<string> {
  try {
    const datePart = toDDMMYY(person.birthdate);
    const randomPart = randomDigits();
    const genderDigit = genderLastDigit(person.gender);
    const cpr = `${datePart}${randomPart}${genderDigit}`;
    return { type: "ok", data: cpr };
  } catch (e) {
    return { type: "err", err: e };
  }
}

/**
 * @description
 * validateCprForPerson checks whether a CPR matches a given person.
 * It verifies that:
 * - The first 6 digits match the person's birthdate (DDMMYY).
 * - The last digit is even for females and odd for males.
 * - The CPR is 10 digits long.
 * @param person - The person to check against.
 * @param cpr - The CPR number to validate.
 * @returns True if the CPR matches the person, false otherwise.
 */
function validateCprForPerson(person: IPerson, cpr: string): boolean {
  const normalized = cpr.replace("-", "");
  if (!/^\d{10}$/.test(normalized)) return false;

  const expectedPrefix = toDDMMYY(person.birthdate);
  if (normalized.slice(0, 6) !== expectedPrefix) return false;

  const lastDigit = Number(normalized.slice(-1));
  const isEven = lastDigit % 2 === 0;

  if (person.gender === "female" && !isEven) return false;
  if (person.gender === "male" && isEven) return false;

  return true;
}

export { createCpr, validateCprForPerson };
