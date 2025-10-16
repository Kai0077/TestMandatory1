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
 * readPersons reads the person_names.json file and creates a js object from it
 * @returns A result type containing either the persons array or an unknown error
 */
function readPersons(): TPersonResult<IPerson[]> {
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
 * getPersons creates a new array of random persons
 * @param amount - Determines how many persons are added to the new array
 * @returns A new array of persons
 */
function getPersons(amount: number): TPersonResult<IPerson[]> {
	if (amount <= 0) {
		return { type: "err", err: "Amount is less than or equal to 0" };
	}

	const result = readPersons();
	if (result.type === "err") {
		return result;
	}
	const personsBase = result.data;

	const persons: IPerson[] = [];
	for (let i = 0; i < amount; i++) {
		const randomIndex = Math.floor(Math.random() * personsBase.length);
		const person = personsBase.at(randomIndex);

		if (!person) {
			throw Error("Random index for person was out of bounds");
		}

		persons.push(person);
	}

	return { type: "ok", data: persons };
}

/**
 * @description
 * createPerson creates a single person
 * @returns A result of either a single person or an unknown error
 */
function createPerson(): TPersonResult<IPerson> {
	const personsResult = getPersons(1);
	if (personsResult.type === "err") {
		return personsResult;
	}

	const person = personsResult.data.at(0);
	if (!person) {
		throw Error("Unable to retrieve person at index 0");
	}

	return { type: "ok", data: person };
}

/**
 * @description
 * createPeople creates x amount of people
 * @param amount - Determines how many people to create, must be higher 0
 * @returns A result of either a person array or an unknown error
 */
function createPeople(amount: number): TPersonResult<IPerson[]> {
	return getPersons(amount);
}

export { createPerson, createPeople };
