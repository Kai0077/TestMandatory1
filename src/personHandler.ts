import fs from "fs";
import { createDate, validateDate } from "./birthdateHandler.js";

type TGender = "male" | "female";

/**
 * @description
 * IPerson describes the shape of the persons array in the json file
 */
interface IRawPerson {
  name: string;
  surname: string;
  gender: TGender;
}

/**
 * Person shape returned by our API (includes generated birthdate).
 */
interface IPerson extends IRawPerson {
  birthdate: string; // YYYY-MM-DD
}

/**
 * Generic result type usable for any kind of data.
 */
type Result<T> = { type: "ok"; data: T } | { type: "err"; err: unknown };

/**
 * @description
 * readPeople reads the person_names.json file and creates a js object from it
 * @returns A result type containing either the persons array or an unknown error
 */
function readPeople(): Result<IRawPerson[]> {
  try {
    const file = fs.readFileSync("persons.json").toString();
    const personNames: IRawPerson[] = JSON.parse(file);

    return { type: "ok", data: personNames };
  } catch (e) {
    return { type: "err", err: e };
  }
}

/**
 * getPeople creates a new array of random persons and attaches a birthdate.
 */
function getPeople(amount: number): Result<IPerson[]> {
  if (amount <= 0) {
    return { type: "err", err: "Amount is less than or equal to 0" };
  }

  const result = readPeople();
  if (result.type === "err") return result;

  const base = result.data;
  const people: IPerson[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * base.length);
    const picked = base.at(randomIndex);
    if (!picked) throw new Error("Random index for person was out of bounds");

    const birthdate = createDate();
    if (!validateDate(birthdate)) {
      throw new Error("Generated invalid birthdate");
    }

    const person: IPerson = {
      ...picked,
      birthdate,
    };

    people.push(person);
  }

  return { type: "ok", data: people };
}

/**
 * @description
 * createPerson creates a single person
 * @returns A result of either a single person or an unknown error
 */
function createPerson(): Result<IPerson> {
  const peopleResult = getPeople(1);
  if (peopleResult.type === "err") {
    return peopleResult;
  }

  const person = peopleResult.data.at(0);
  if (!person) {
    return { type: "err", err: "Unable to retrieve person at index 0" };
  }

  return { type: "ok", data: person };
}

/**
 * @description
 * createPeople creates x amount of people
 * @param amount - Determines how many people to create, must be higher than 0
 * @returns A result of either a person array or an unknown error
 */
function createPeople(amount: number): Result<IPerson[]> {
  return getPeople(amount);
}

export { createPerson, createPeople, type TGender };
