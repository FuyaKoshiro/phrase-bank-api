export interface IYouTubeService {
  getCaptions({ videoId }: { videoId: string }): Promise<CaptionObject[]>;
  getVideoData({ videoId }: { videoId: string }): Promise<VideoDataFromYouTube>;
  searchVideos({
    searchQuery,
    startIndex,
  }: {
    searchQuery: string;
    startIndex: number;
  }): Promise<TransformedYouTubeSearchResponseItem[]>;
}

export type CaptionObject = {
  index: number;
  text: string;
  start: number;
  end: number;
};

export type VideoDataFromYouTube = {
  videoId: string;
  title: string;
};

export type TransformedYouTubeSearchResponseItem = {
  videoId: string;
  thumbnail: Thumbnail;
  title: string;
  publishedAt: Date;
  channelTitle: string;
  description: string;
};

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
