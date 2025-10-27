import { describe, it, assert, vi, expect } from "vitest";
import { generateAddress } from "../src/addressHandler.js";

// Mock DB to return a fixed town row
vi.mock("../src/db/index.js", () => ({
  db: {
    select: () => ({
      from: () => ({
        orderBy: () => ({
          limit: async () => [
            { id: 7, postalCode: "2100", name: "København Ø" },
          ],
        }),
      }),
    }),
    // Fallback API (not used when select() works)
    query: {
      townTable: {
        findMany: async () => [
          { id: 7, postalCode: "2100", name: "København Ø" },
        ],
      },
    },
  },
}));

// Mock table + sql tag
vi.mock("../src/db/town/schema.js", () => ({ townTable: {} }));
vi.mock("drizzle-orm", () => ({
  sql: (s: TemplateStringsArray) => s.join(""),
}));

// 1–3 words, letters only
const streetRegex = /^[A-Za-z]+(?:\s[A-Za-z]+){0,2}$/;

describe("Positive", () => {
  it("Should create a single address", async () => {
    const a = await generateAddress();

    // Type checks via getters
    assert(typeof a.getStreet() === "string");
    assert(typeof a.getNumber() === "number");
    assert(typeof a.getFloor() === "number");
    assert(typeof a.getDoor() === "number");

    // Contract checks
    assert(streetRegex.test(a.getStreet()));
    assert(a.getNumber() >= 1 && a.getNumber() <= 999);
    assert(a.getFloor() >= 1 && a.getFloor() <= 99);
    assert(a.getDoor() >= 1 && a.getDoor() <= 50);

    // Town attached from DB
    const town = a.getTown();
    assert(!!town);
    assert(town.getPostalCode() === "2100");
    assert(town.getName() === "København Ø");
  });

  it.each([1, 2, 20])(
    "Should create %s addresses within range",
    async (count) => {
      for (let i = 0; i < count; i++) {
        const a = await generateAddress();
        assert(streetRegex.test(a.getStreet()));
        assert(a.getNumber() >= 1 && a.getNumber() <= 999);
        assert(a.getFloor() >= 1 && a.getFloor() <= 99);
        assert(a.getDoor() >= 1 && a.getDoor() <= 50);
      }
    },
  );

  it("Boundary: minimal values when RNG ~ 0", async () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0);
    const a = await generateAddress();
    assert(a.getNumber() === 1);
    assert(a.getFloor() === 1);
    assert(a.getDoor() === 1);
    assert(streetRegex.test(a.getStreet()));
    spy.mockRestore();
  });

  it("Boundary: maximal values when RNG ~ 1", async () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.999999);
    const a = await generateAddress();
    assert(a.getNumber() === 999);
    assert(a.getFloor() === 99);
    assert(a.getDoor() === 50);
    assert(streetRegex.test(a.getStreet()));
    spy.mockRestore();
  });
});

describe("Negative", () => {
  it("Should fail when no towns exist in DB", async () => {
    // Reset cache so re-mocks take effect
    vi.resetModules();

    // Re-mock DB to return empty results
    vi.doMock("../src/db/index.js", () => ({
      db: {
        select: () => ({
          from: () => ({
            orderBy: () => ({ limit: async () => [] }),
          }),
        }),
        query: { townTable: { findMany: async () => [] } },
      },
    }));
    vi.doMock("../src/db/town/schema.js", () => ({ townTable: {} }));
    vi.doMock("drizzle-orm", () => ({
      sql: (s: TemplateStringsArray) => s.join(""),
    }));

    // Re-import SUT with new mocks
    const { generateAddress: gen } = await import("../src/addressHandler.js");

    // Expect rejection when no towns are available
    await expect(gen()).rejects.toThrow(
      /No towns in database|Unsupported DB interface/,
    );
  });
});

// White-box test

describe("White-box (generateAddress internal fallback)", () => {
  it("Should use fallback query when primary DB path fails", async () => {
    vi.resetModules();

    // Spy and force primary path to fail
    const limitSpy = vi.fn(async () => {
      throw new Error("primary DB method failed");
    });

    // Fallback mock returns a valid town
    const fallbackSpy = vi.fn(async () => [
      { id: 99, postalCode: "8000", name: "Aarhus C" },
    ]);

    vi.doMock("../src/db/index.js", () => ({
      db: {
        select: () => ({
          from: () => ({
            orderBy: () => ({ limit: limitSpy }),
          }),
        }),
        query: { townTable: { findMany: fallbackSpy } },
      },
    }));

    vi.doMock("../src/db/town/schema.js", () => ({ townTable: {} }));
    vi.doMock("drizzle-orm", () => ({
      sql: (s: TemplateStringsArray) => s.join(""),
    }));

    // Re-import SUT with failing primary path mock
    const { generateAddress } = await import("../src/addressHandler.js");

    const a = await generateAddress();

    // Primary failed, so fallback must be used
    expect(limitSpy).toHaveBeenCalledTimes(1);
    expect(fallbackSpy).toHaveBeenCalledTimes(1);

    // Town should come from fallback
    expect(a.getTown().getPostalCode()).toBe("8000");
    expect(a.getTown().getName()).toBe("Aarhus C");
  });
});
