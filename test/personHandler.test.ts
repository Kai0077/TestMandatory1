import { describe, it, assert } from "vitest";
import { createPeople, createPerson } from "../src/personHandler.js";

describe("Positive", () => {
  it("Should create a single person", () => {
    const personResult = createPerson();

    assert(personResult.type === "ok", "Person result should be ok");
  });
  it.each([1, 2, 50])("Should create a x people", (amount) => {
    const peopleResult = createPeople(amount);

    assert(peopleResult.type === "ok", "People result should be ok");
  });
});

describe("negative", () => {
  it.each([-1, 0])("Should fail due to invalid amoun", (amount) => {
    const peopleResult = createPeople(amount);

    assert(peopleResult.type === "err", "People result should be err");
  });
});
