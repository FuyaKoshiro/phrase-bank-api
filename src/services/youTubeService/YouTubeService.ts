import {
  TranscriptType,
  VideoDataFromYouTube,
} from "@repositories/youTubeRepository/youTubeRepositorySchema";
import { IYouTubeService } from "../../services/interfaces/IYouTubeService";
import {
  transformTranscriptToCaptionType,
  validateVideoId,
} from "./utils/youTubeServiceHelpers";

export class YouTubeService implements IYouTubeService {
  constructor(
    private getTranscriptFn: (videoId: string) => Promise<TranscriptType[]>,
    private getVideoDataFn: (videoId: string) => Promise<VideoDataFromYouTube>
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
}
