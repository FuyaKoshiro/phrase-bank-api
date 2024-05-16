import { validateVideoToCreate } from "./VideoServiceHelpers";

describe("validateVideoToCreate", () => {
  it("given a valid video, return the video", () => {
    const mockVideo = {
      id: "good",
      title: "good",
    };
    expect(validateVideoToCreate(mockVideo)).toEqual(mockVideo);
  });

  it("given a video with a space in idFromYoutube, throw", () => {
    const mockVideo = {
      id: "bad id",
      title: "good",
    };
    expect(() => validateVideoToCreate(mockVideo)).toThrow();
  });

  it("given a video with a space in title, return the video", () => {
    const mockVideo = {
      id: "good",
      title: "bad title",
    };
    expect(validateVideoToCreate(mockVideo)).toEqual(mockVideo);
  });
});
