import { IPhraseService } from "@services/interfaces/IPhraseService";
import { PhraseService } from "./PhraseService";

describe("getPhrasesByUserId", () => {
  const mockedPhrase = {
    id: "1",
    userId: "1",
    videoId: "1",
    text: "Hello, World!",
    start: 0,
    end: 1,
    archivedAt: undefined,
    createdAt: new Date("2021-08-01T00:00:00.000Z"),
    updatedAt: new Date("2021-08-01T00:00:00.000Z"),
  };

  let phraseService: IPhraseService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedFetchPhrasesByUserId = jest.fn();
    mockedFetchPhrasesByUserId.mockResolvedValue([mockedPhrase]);

    // create function should not affect anything, so just pass jest.fn()
    phraseService = new PhraseService(
      mockedFetchPhrasesByUserId,
      jest.fn(),
      jest.fn(),
      jest.fn()
    );
  });

  it("should get phrases by user id", async () => {
    const phrases = await phraseService.getPhrasesByUserId("1");

    expect(phrases).toEqual([mockedPhrase]);
  });

  it("should get an empty array if no phrases are found", async () => {
    const mockedFetchPhrasesByUserId = jest.fn();
    mockedFetchPhrasesByUserId.mockResolvedValue([]);

    const phraseService = new PhraseService(
      mockedFetchPhrasesByUserId,
      jest.fn(),
      jest.fn(),
      jest.fn()
    );
    const phrases = await phraseService.getPhrasesByUserId("1");

    expect(phrases).toEqual([]);
  });

  it("should throw an error if the user id is invalid", async () => {
    // need to use callback function to test
    // if this function is directly invoked, simply causes an error
    await expect(async () => {
      await phraseService.getPhrasesByUserId("invalid id");
    }).rejects.toThrow();
  });
});

describe("checkIfPhraseExists", () => {
  let phraseService: IPhraseService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedCountPhrase = jest.fn();
    mockedCountPhrase.mockResolvedValue(1);

    phraseService = new PhraseService(
      jest.fn(),
      mockedCountPhrase,
      jest.fn(),
      jest.fn()
    );
  });

  it("should return true if a phrase exists", async () => {
    const phraseExists = await phraseService.checkIfPhraseExists(
      "1",
      "videoId",
      0
    );

    expect(phraseExists).toBe(true);
  });

  it("should return false if a phrase does not exist", async () => {
    const mockedCountPhrase = jest.fn();
    mockedCountPhrase.mockResolvedValue(0);

    const phraseService = new PhraseService(
      jest.fn(),
      mockedCountPhrase,
      jest.fn(),
      jest.fn()
    );

    const phraseExists = await phraseService.checkIfPhraseExists(
      "1",
      "videoId",
      0
    );

    expect(phraseExists).toBe(false);
  });

  it("should throw an error if the user id is invalid", async () => {
    await expect(async () => {
      await phraseService.checkIfPhraseExists("invalid id", "videoId", 0);
    }).rejects.toThrow();
  });
});

describe("createPhrase", () => {
  const mockedCreatedPhrase = {
    userId: "1",
    videoId: "1",
    text: "Hello, World!",
    start: 0,
    end: 1,
    archivedAt: null,
    createdAt: new Date("2021-08-01T00:00:00.000Z"),
    updatedAt: new Date("2021-08-01T00:00:00.000Z"),
  };

  let phraseService: IPhraseService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedCreatePhrase = jest.fn();
    mockedCreatePhrase.mockResolvedValue(mockedCreatedPhrase);

    phraseService = new PhraseService(
      jest.fn(),
      jest.fn(),
      mockedCreatePhrase,
      jest.fn()
    );
  });

  it("should create and return a phrase", async () => {
    const mockPhraseToCreate = {
      userId: "1",
      videoId: "1",
      text: "Hello, World!",
      start: 0,
      end: 1,
    };

    const phrase = await phraseService.createPhrase(mockPhraseToCreate);
    expect(phrase).toEqual(mockedCreatedPhrase);
  });

  it("should throw an error if a prase to create is invalid", async () => {
    await expect(async () => {
      await phraseService.createPhrase({} as any);
    }).rejects.toThrow();
  });
});

describe("deletePhrase", () => {
  let phraseService: IPhraseService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedDeletePhrase = jest.fn();
    mockedDeletePhrase.mockResolvedValue(undefined);

    phraseService = new PhraseService(
      jest.fn(),
      jest.fn(),
      jest.fn(),
      mockedDeletePhrase
    );
  });

  it("should delete a phrase", async () => {
    await phraseService.deletePhrase("1");
    expect(true).toBe(true);
  });

  it("should throw an error if the phrase id is invalid", async () => {
    await expect(async () => {
      await phraseService.deletePhrase("invalid id");
    }).rejects.toThrow();
  });
});
