import {
  modifyPhraseToCreate,
  validatePhraseToCreate,
} from "./phraseServiceHelpers";

describe("validatePhraseToCreate", () => {
  it("given a valid phrase input, should return a phrase", () => {
    const phrase = {
      userId: "1",
      videoId: "1",
      text: "Hello world",
      start: 0,
      end: 1,
    };

    const result = validatePhraseToCreate(phrase);
    expect(result).toEqual(phrase);
  });

  it("given an invalid phrase, should throw an error", () => {
    const phrase = {
      userId: "",
      videoId: "1",
      text: "Hello world",
      start: 0,
      end: 1,
    };

    expect(() => validatePhraseToCreate(phrase)).toThrow();
  });
});

describe("modifyPhraseToCreate", () => {
  const phrase = {
    userId: "1",
    videoId: "1",
    text: "Hello world ",
    start: "0",
    end: "1",
  };

  it("should convert start and end to numbers", () => {
    const result = modifyPhraseToCreate(phrase);
    expect(result.start).toEqual(0.0);
    expect(result.end).toEqual(1.0);
  });
});
