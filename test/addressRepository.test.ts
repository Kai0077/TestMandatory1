import { describe, it, assert } from "vitest";
import { addressRepository } from "../src/db/adress/repository.js";

describe("addressRepository (fetching)", () => {
  it("Should fetch all addresses without throwing", async () => {
    // Arrange
    let error = null;

    // Act
    try {
      const result = await addressRepository.getAll();

      // Assert
      assert(Array.isArray(result), "Result should be an array");
    } catch (err) {
      error = err;
    }

    // Assert
    assert.strictEqual(error, null, "Fetching all addresses should not throw");
  });

  it("Should fetch a single address by ID", async () => {
    // Arrange
    const idToFetch = 1;

    // Act
    const address = await addressRepository.getById(idToFetch);

    // Assert
    if (address) {
      assert("id" in address, "Fetched address should have an ID");
      assert("street" in address, "Fetched address should have a street");
    } else {
      assert.strictEqual(address, undefined, "Should return undefined if ID not found");
    }
  });
});
