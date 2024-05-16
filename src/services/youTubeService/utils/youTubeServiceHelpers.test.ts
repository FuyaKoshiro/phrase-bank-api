import { TranscriptResponse } from "youtube-transcript";
import {
  transformTranscriptToCaptionType,
  validateVideoId,
} from "./youTubeServiceHelpers";

describe("validateVideoId", () => {
  it("should return the video id if it is valid", () => {
    const videoId = "validVideoId";
    const result = validateVideoId(videoId);
    expect(result).toEqual(videoId);
  });

  it("should throw an error if the video id is invalid", () => {
    const videoId = "video id";
    expect(() => validateVideoId(videoId)).toThrow();
  });
});

describe("transformTranscriptToCaptionType", () => {
  it("given a list of transcripts, should return a list of caption objects. The numbers have one decimal place", () => {
    const transcripts = [
      {
        offset: 25,
        duration: 23,
        text: "Hello, world!",
      },
    ];

    const captions = transformTranscriptToCaptionType(transcripts);
    expect(captions).toEqual([
      {
        index: 0,
        text: "Hello, world!",
        start: 25.0,
        end: 48.0,
      },
    ]);
  });

  it("given an empty list of transcripts, should return an empty list of captions", () => {
    const transcripts = [] as TranscriptResponse[];

    const captions = transformTranscriptToCaptionType(transcripts);
    expect(captions).toEqual([]);
  });
});
