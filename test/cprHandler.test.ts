import { describe, it, assert } from "vitest";
import { createPerson } from "../src/personHandler.js";
import { createCpr, validateCprForPerson } from "../src/cprHandler.js";
import { Person } from "../src/entities/Person.js";

// Helper type for tests
type TPersonWithCPRNumber = Pick<
  typeof Person.prototype,
  "name" | "surname" | "gender" | "birthdate"
>;

/**
 * @description
 * Positive tests for CPR handler.
 * These verify that valid CPR numbers are generated and validated correctly.
 */
describe("Positive", () => {
  /**
   * @description
   * Ensures that a valid CPR can be generated for a single person
   * and that the CPR passes validation.
   */
  it("Should create a valid CPR for a single person", async () => {
    const personResult = await createPerson();
    assert(personResult.type === "ok", "Person result should be ok");

    const { birthdate, gender } = personResult.data;
    const cprResult = createCpr(birthdate, gender);
    assert(cprResult.type === "ok", "CPR result should be ok");

    const isValid = validateCprForPerson(birthdate, gender, cprResult.data);
    assert(isValid, "Generated CPR should be valid for the person");
  });

  /**
   * @description
   * Verifies that the last digit of the CPR follows Danish CPR gender rules:
   * - Females have an even last digit.
   * - Males have an odd last digit.
   */
  it("Should generate an even last digit for females and odd for males", () => {
    //mocking person objects because TGender has to be explicitly set
    const female: TPersonWithCPRNumber = {
      name: "Anna",
      surname: "Jensen",
      gender: "female",
      birthdate: "1990-05-12",
    };

    const male: TPersonWithCPRNumber = {
      name: "Peter",
      surname: "Hansen",
      gender: "male",
      birthdate: "1990-05-12",
    };

    const cprFemale = createCpr(female.birthdate, female.gender);
    const cprMale = createCpr(male.birthdate, male.gender);

    assert(cprFemale.type === "ok", "Female CPR creation should be ok");
    assert(cprMale.type === "ok", "Male CPR creation should be ok");

    // female CPR must end with an even number
    const lastDigitFemale = Number(cprFemale.data.slice(-1));
    assert(
      lastDigitFemale % 2 === 0,
      "Female CPR should end with an even digit",
    );

    // and male CPR must end with an odd number
    const lastDigitMale = Number(cprMale.data.slice(-1));
    assert(lastDigitMale % 2 === 1, "Male CPR should end with an odd digit");
  });
});

/**
 * @description
 * Negative tests for CPR handler.
 * These verify that invalid CPR numbers are correctly detected as invalid.
 */
describe("Negative", () => {
  /**
   * @description
   * Ensures that validation fails when the birthdate portion
   * of the CPR does not match the person's actual birthdate.
   */
  it("Should fail to validate CPR if birthdate part doesn't match", async () => {
    const personResult = await createPerson();
    assert(personResult.type === "ok", "Person result should be ok");

    // intentionally wrong birthdate part (01-01-99)
    const wrongCpr = "0101991234";
    const { birthdate, gender } = personResult.data;
    const isValid = validateCprForPerson(birthdate, gender, wrongCpr);

    assert(!isValid, "CPR with wrong birthdate should be invalid");
  });

  /**
   * @description
   * Ensures that validation fails when the gender in the CPR
   * does not match the person's actual gender.
   */
  it("Should fail to validate CPR if gender does not match", () => {
    const person: TPersonWithCPRNumber = {
      name: "Maria",
      surname: "Larsen",
      gender: "female",
      birthdate: "1995-09-09",
    };

    // generates cpr for the same person but gender is male
    const maleCprResult = createCpr(person.birthdate, "male");

    assert(maleCprResult.type === "ok", "CPR generation should be ok");

    // checking that a CPR made for a male person is rejected when validated against a female person both with same info just gender is different
    const isValid = validateCprForPerson(
      person.birthdate,
      person.gender,
      maleCprResult.data,
    );
    assert(!isValid, "CPR with mismatched gender should be invalid");
  });
});
