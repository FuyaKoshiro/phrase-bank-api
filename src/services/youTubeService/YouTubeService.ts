import {
  TranscriptType,
  VideoDataFromYouTube,
  YouTubeSearchResponse,
} from "@repositories/youTubeRepository/youTubeRepositorySchema";
import {
  IYouTubeService,
  TransformedYouTubeSearchResponseItem,
} from "../../services/interfaces/IYouTubeService";
import {
  transformSearchResults,
  transformTranscriptToCaptionType,
  validateVideoId,
} from "./utils/youTubeServiceHelpers";

export class YouTubeService implements IYouTubeService {
  constructor(
    private getTranscriptFn: (videoId: string) => Promise<TranscriptType[]>,
    private getVideoDataFn: (videoId: string) => Promise<VideoDataFromYouTube>,
    private searchVideosFn: (
      searchQuery: string,
      startIndex: number
    ) => Promise<YouTubeSearchResponse>
  ) {}

  getCaptions = async (videoId: string): Promise<any> => {
    try {
      const validatedVideoId = validateVideoId(videoId);
      const transcript = await this.getTranscriptFn(validatedVideoId);
      const captionObjects = transformTranscriptToCaptionType(transcript);
      return captionObjects;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getVideoData = async (videoId: string): Promise<any> => {
    try {
      const validatedVideoId = validateVideoId(videoId);
      const videoData = await this.getVideoDataFn(validatedVideoId);
      return videoData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  searchVideos = async (
    searchQuery: string,
    startIndex: number
  ): Promise<TransformedYouTubeSearchResponseItem[]> => {
    try {
      const searchResults = await this.searchVideosFn(searchQuery, startIndex);
      return transformSearchResults(searchResults);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
