import { describe, it, assert } from "vitest";
import { generatePhoneNumber } from "../src/phoneNumberHandler.js";

describe("Positive", () => {
  it("Should create a phone number of 8 digits", () => {
    const phoneNumbers = [];
    for (let i = 0; i <= 1000; i++) {
      const phoneNumber = generatePhoneNumber();
      phoneNumbers.push(phoneNumber);
    }

    phoneNumbers.map((nr) => (nr.length === 8 ? nr : "-1"));

    assert(
      !phoneNumbers.includes("-1"),
      "A valid phone number is always 8 digits",
    );
  });
});

describe("Negative", () => {
  it("Should fail due to invalid first two digits of the phone number", () => {
    const phoneNumbers = [];
    for (let i = 0; i <= 1000; i++) {
      const phoneNumber = parseInt(generatePhoneNumber().substring(0, 2));
      phoneNumbers.push(phoneNumber);
    }

    phoneNumbers.map((nr) => (nr < 830 ? nr : -1));

    assert(
      !phoneNumbers.includes(-1),
      "The start of a phone number may not be grander than 830",
    );
  });
});
