import { describe, it, assert } from "vitest";
import { createPeople, createPerson } from "../src/personHandler.js";

describe("Positive", () => {
	it("Should create a single person", async () => {
		const personResult = await createPerson();

		assert(personResult.type === "ok", "Person result should be ok");
	});

	it.each([1, 2, 50])("Should create x people", async (amount) => {
		const peopleResult = await createPeople(amount);

		assert(peopleResult.type === "ok", "People result should be ok");
	});
});

describe("Negative", () => {
	it.each([-1, 0])("Should fail due to invalid amount", async (amount) => {
		const peopleResult = await createPeople(amount);

		assert(peopleResult.type === "err", "People result should be err");
	});
});
