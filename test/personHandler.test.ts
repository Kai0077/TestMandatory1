import { describe, it, assert } from "vitest";
import { createPeople, createPerson } from "../src/personHandler.js";

describe("Positive", () => {
	it("Should create a single person", () => {
		const personResult = createPerson();

		assert(personResult.type === "ok", "Person result should be ok");
	})
	it.each([1, 2, 50])("Should create a x persons", (amount) => {
		const personResult = createPeople(amount);

		assert(personResult.type === "ok", "Person result should be ok");
	})
});

describe("negative", () => {
	it.each([-1, 0])("Should fail due to invalid amoun", (amount) => {
		const personResult = createPeople(amount);

		assert(personResult.type === "err", "Person result should be err");
	})
});
