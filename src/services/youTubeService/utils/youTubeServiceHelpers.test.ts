import { TranscriptResponse } from "youtube-transcript";
import {
  transformSearchResults,
  transformTranscriptToCaptionType,
  validateVideoId,
} from "./youTubeServiceHelpers";
import { YouTubeSearchResponse } from "@repositories/youTubeRepository/youTubeRepositorySchema";
import { TransformedYouTubeSearchResponseItem } from "@services/interfaces/IYouTubeService";

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

describe("transformSearchResults", () => {
  it("should transform search results into the expected format", () => {
    const response: YouTubeSearchResponse = {
      kind: "youtube#searchListResponse",
      etag: "etag1",
      nextPageToken: "nextPageToken1",
      regionCode: "regionCode1",
      pageInfo: {
        totalResults: 100,
        resultsPerPage: 10,
      },
      items: [
        {
          kind: "video",
          etag: "etag1",
          id: {
            kind: "video",
            videoId: "videoId1",
          },
          snippet: {
            publishedAt: new Date("2022-01-01T00:00:00Z"),
            channelId: "channelId1",
            title: "title1",
            description: "description1",
            thumbnails: {
              default: {
                url: "thumbnailUrl1",
                width: 120,
                height: 90,
              },
              medium: {
                url: "thumbnailUrl1_medium",
                width: 320,
                height: 180,
              },
              high: {
                url: "thumbnailUrl1_high",
                width: 480,
                height: 360,
              },
            },
            channelTitle: "channelTitle1",
            liveBroadcastContent: "liveBroadcastContent1",
            publishTime: new Date("2022-01-01T00:00:00Z"),
          },
        },
      ],
    };

    const expectedTransformedResponse: TransformedYouTubeSearchResponseItem[] =
      [
        {
          videoId: "videoId1",
          thumbnail: {
            url: "thumbnailUrl1",
            width: 120,
            height: 90,
          },

          title: "title1",
          publishedAt: new Date("2022-01-01T00:00:00Z"),
          channelTitle: "channelTitle1",
          description: "description1",
        },
      ];

    const transformedResponse = transformSearchResults(response);
    expect(transformedResponse).toEqual(expectedTransformedResponse);
  });
});
