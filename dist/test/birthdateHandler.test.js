import { describe, it, assert } from "vitest";
import { createDate, validateDate } from "../src/birthdateHandler.js";
describe("Positive", () => {
  it("Should create a valid random date", () => {
    const date = createDate();
    const isValid = validateDate(date);
    assert(isValid, "The created date should be valid");
  });
  it("Should validate a clearly valid date", () => {
    const date = "2000-05-12";
    const isValid = validateDate(date);
    assert(isValid, "Date within the last 50 years should be valid");
  });
});
describe("Negative", () => {
  it("Should reject a date in the future", () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const futureDate = future.toISOString().split("T")[0];
    const isValid = validateDate(futureDate);
    assert(!isValid, "Future dates should be invalid");
  });
  it("Should reject a date older than 50 years", () => {
    const old = new Date();
    old.setFullYear(old.getFullYear() - 51);
    const oldDate = old.toISOString().split("T")[0];
    const isValid = validateDate(oldDate);
    assert(!isValid, "Dates older than 50 years should be invalid");
  });
  it("Should reject an invalid date string", () => {
    const invalid = "not-a-date";
    const isValid = validateDate(invalid);
    assert(!isValid, "Invalid date strings should be rejected");
  });
});
