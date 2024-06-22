import { IYouTubeService } from "../../services/interfaces/IYouTubeService";
import { YouTubeService } from "./YouTubeService";

describe("getCaptions", () => {
  let youTubeService: IYouTubeService;

  const mockedCaptions = [
    {
      text: "Hello, world!",
      duration: 3,
      offset: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedGetTranscripts = jest.fn();
    mockedGetTranscripts.mockResolvedValue(mockedCaptions);

    youTubeService = new YouTubeService(
      mockedGetTranscripts,
      jest.fn(),
      jest.fn()
    );
  });

  it("given a valid video id, should return captions", async () => {
    const videoId = "validVideoId";

    const captions = await youTubeService.getCaptions(videoId);
    expect(captions).toEqual([
      {
        index: 0,
        text: "Hello, world!",
        start: 2.0,
        end: 5.0,
      },
    ]);
  });

  it("given an invalid video id, throw", async () => {
    const videoId = "video id";

    await expect(async () => {
      await youTubeService.getCaptions(videoId);
    }).rejects.toThrow();
  });
});

describe("getVideoData", () => {
  let youTubeService: IYouTubeService;

  const mockedVideoData = {
    videoId: "validVideoId",
    title: "Hello, world!",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedGetVideoData = jest.fn();
    mockedGetVideoData.mockResolvedValue(mockedVideoData);

    youTubeService = new YouTubeService(
      jest.fn(),
      mockedGetVideoData,
      jest.fn()
    );
  });

  it("given a valid video id, should return video data", async () => {
    const videoId = "validVideoId";

    const videoData = await youTubeService.getVideoData(videoId);
    expect(videoData).toEqual(mockedVideoData);
  });

  it("given an invalid video id, throw", async () => {
    const videoId = "video id";

    await expect(async () => {
      await youTubeService.getVideoData(videoId);
    }).rejects.toThrow();
  });
});

describe("searchVideos", () => {
  let youTubeService: IYouTubeService;

  const mockedSearchResults = {
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

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedSearchVideos = jest.fn();
    mockedSearchVideos.mockResolvedValue(mockedSearchResults);

    youTubeService = new YouTubeService(
      jest.fn(),
      jest.fn(),
      mockedSearchVideos
    );
  });

  it("given a valid search query, should return search results", async () => {
    const searchQuery = "valid search query";
    const startIndex = 0;

    const searchResults = await youTubeService.searchVideos(
      searchQuery,
      startIndex
    );
    expect(searchResults).toEqual([
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
    ]);
  });
});
