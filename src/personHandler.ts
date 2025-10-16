import fs from "fs";

/**
 * @description
 * IPerson describes the shape of the persons array in the json file
 */
interface IPerson {
	name: string;
	surname: string;
	gender: "male" | "female";
}

/**
 * @description
 * A helper type to avoid redundency
 */
type TPersonUnion = IPerson | IPerson[];

/**
 * @description
 * A helper type to allow for either a person or a person array
 */
interface TPersonSuccess<T extends TPersonUnion> {
	type: "ok";
	data: T;
}

/**
 * @description
 * A result type of either a person array or an unknown error
 */
type TPersonResult<T extends TPersonUnion> =
	| TPersonSuccess<T>
	| { type: "err"; err: unknown };

/**
 * @description
 * readPeople reads the person_names.json file and creates a js object from it
 * @returns A result type containing either the persons array or an unknown error
 */
function readPeople(): TPersonResult<IPerson[]> {
	try {
		const file = fs.readFileSync("persons.json").toString();
		const personNames = JSON.parse(file);

		return { type: "ok", data: personNames };
	} catch (e) {
		return { type: "err", err: e };
	}
}

/**
 * @description
 * getPeople creates a new array of random persons
 * @param amount - Determines how many persons are added to the new array
 * @returns A new array of persons
 */
function getPeople(amount: number): TPersonResult<IPerson[]> {
	if (amount <= 0) {
		return { type: "err", err: "Amount is less than or equal to 0" };
	}

	const result = readPeople();
	if (result.type === "err") {
		return result;
	}
	const peopleBase = result.data;

	const people: IPerson[] = [];
	for (let i = 0; i < amount; i++) {
		const randomIndex = Math.floor(Math.random() * peopleBase.length);
		const person = peopleBase.at(randomIndex);

		if (!person) {
			throw Error("Random index for person was out of bounds");
		}

		people.push(person);
	}

	return { type: "ok", data: people };
}

/**
 * @description
 * createPerson creates a single person
 * @returns A result of either a single person or an unknown error
 */
function createPerson(): TPersonResult<IPerson> {
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
function createPeople(amount: number): TPersonResult<IPerson[]> {
	return getPeople(amount);
}

export { createPerson, createPeople };
