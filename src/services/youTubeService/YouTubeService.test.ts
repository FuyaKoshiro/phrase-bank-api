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

    youTubeService = new YouTubeService(mockedGetTranscripts, jest.fn());
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

    youTubeService = new YouTubeService(jest.fn(), mockedGetVideoData);
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
