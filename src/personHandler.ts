import fs from "fs";
import { createDate } from "./birthdateHandler.js";
import { createCpr } from "./cprHandler.js";
import { generatePhoneNumber } from "./phoneNumberHandler.js";
import { generateAddress } from "./addressHandler.js";
import { Person } from "./entities/Person.js";

type TGender = "male" | "female";

/**
 * @description
 * IRawPerson describes the shape of the persons array in the json file
 */
interface IRawPerson {
  name: string;
  surname: string;
  gender: TGender;
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
function getRawPeople(amount: number): Result<IRawPerson[]> {
  if (amount <= 0) {
    return { type: "err", err: "Amount is less than or equal to 0" };
  }

  const result = readPeople();
  if (result.type === "err") return result;

  const base = result.data;
  const people: IRawPerson[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * base.length);
    const person = base.at(randomIndex);
    if (!person) throw new Error("Random index for person was out of bounds");

    people.push(person);
  }

  return { type: "ok", data: people };
}

/**
 * @description
 * getPeople retrieves x amount of raw people using getRawPeople. It then converts them to Person entities,
 * using other handlers like address, birthday and cpr to create a complete person.
 * @param amount - Determines how many people to create.
 */
async function getPeople(amount: number): Promise<Result<Person[]>> {
  const rawPersonResults = getRawPeople(amount);
  if (rawPersonResults.type === "err") {
    return rawPersonResults;
  }

  const personResults = await Promise.all(
    rawPersonResults.data.map(async (person, i) => {
      const birthdate = createDate();
      const cprResult = createCpr(birthdate, person.gender);

      if (cprResult.type === "err") {
        return { type: "err", err: "Could not create cpr number" };
      }

      const address = await generateAddress();
      const phoneNumber = generatePhoneNumber();

      const personEntity = new Person(
        i,
        person.name,
        person.surname,
        person.gender,
        cprResult.data,
        address,
        phoneNumber,
        birthdate,
      );

      return { type: "ok", data: personEntity };
    }),
  );

  const personErrResult = personResults.find(
    (personResult) => personResult.type === "err",
  );
  if (personErrResult) {
    return { type: "err", err: "Not every person could be created" };
  }

  const people = personResults.map((personResult) => personResult.data!);

  return { type: "ok", data: people };
}

/**
 * @description
 * createPerson creates a single person
 * @returns A result of either a single person or an unknown error
 */
async function createPerson(): Promise<Result<Person>> {
  const peopleResult = await getPeople(1);
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
function createPeople(amount: number): Promise<Result<Person[]>> {
  return getPeople(amount);
}

export { createPerson, createPeople, type TGender };
