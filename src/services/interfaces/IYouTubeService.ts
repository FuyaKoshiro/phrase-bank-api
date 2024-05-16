export interface VideoDataFromYouTube {
  videoId: string;
  title: string;
}

export interface IYouTubeService {
  getCaptions: (videoId: string) => Promise<any>;
  getVideoData: (videoId: string) => Promise<any>;
}