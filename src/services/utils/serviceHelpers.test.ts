import { validateId } from "./serviceHelpers";

describe("validateUserId", () => {
  it("given a string, return true", () => {
    const mockUserId = "good";
    expect(validateId(mockUserId)).toEqual(mockUserId);
  });

  it("given numbers, throw", () => {
    const mockUserId = 1341;
    expect(() => validateId(mockUserId)).toThrow();
  });

  it("given undefined, throw", () => {
    const mockUserId = undefined;
    expect(() => validateId(mockUserId)).toThrow();
  });

  it("given null, throw", () => {
    const mockUserId = null;
    expect(() => validateId(mockUserId)).toThrow();
  });

  it("given a string with space, throw", () => {
    const mockUserId = "bad userId";
    expect(() => validateId(mockUserId)).toThrow();
  });
});
