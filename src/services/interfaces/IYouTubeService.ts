import {
  Thumbnail,
  YouTubeSearchResponse,
} from "@repositories/youTubeRepository/youTubeRepositorySchema";

export interface IYouTubeService {
  getCaptions: (videoId: string) => Promise<any>;
  getVideoData: (videoId: string) => Promise<any>;
  searchVideos: (
    searchQuery: string,
    startIndex: number
  ) => Promise<TransformedYouTubeSearchResponseItem[]>;
}

export type TransformedYouTubeSearchResponseItem = {
  videoId: string;
  thumbnail: Thumbnail;
  title: string;
  publishedAt: Date;
  channelTitle: string;
  description: string;
};
