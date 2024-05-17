import { IVideoService } from "../../services/interfaces/IVideoService";
import { VideoService } from "./VideoService";

describe("getVideosByUserId", () => {
  const mockedVideos = [
    { id: "1", title: "Video 1", userId: "1" },
    { id: "2", title: "Video 2", userId: "1" },
  ];

  let videoService: IVideoService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedGetVideosByUserId = jest.fn();
    mockedGetVideosByUserId.mockResolvedValue(mockedVideos);

    videoService = new VideoService(mockedGetVideosByUserId, jest.fn(), jest.fn());
  });

  it("should return videos", async () => {
    const videos = await videoService.getVideos(["1", "2"]);

    expect(videos).toEqual(mockedVideos);
  });

  it("should throw an error if the user id is invalid", async () => {
    await expect(async () => {
      await videoService.getVideos(["invalid id"]);
    }).rejects.toThrow();
  });
});

describe("createVideo", () => {
  const mockedVideoToCreate = {
    id: "1",
    title: "Video 1",
  };

  let videoService: IVideoService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedCreateVideo = jest.fn();
    mockedCreateVideo.mockResolvedValue(mockedVideoToCreate);

    videoService = new VideoService(jest.fn(), jest.fn(), mockedCreateVideo);
  });

  it("should return a video", async () => {
    const video = await videoService.createVideo(mockedVideoToCreate);

    expect(video).toEqual(mockedVideoToCreate);
  });

  it("should throw an error if the video idFromYoutube is invalid", async () => {
    await expect(async () => {
      await videoService.createVideo({
        ...mockedVideoToCreate,
        id: "bad id",
      });
    }).rejects.toThrow();
  });
});
