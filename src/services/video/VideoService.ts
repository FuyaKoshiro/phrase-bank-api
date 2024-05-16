import {
  IVideoService,
  VideoToUpsertType,
} from "@services/interfaces/IVideoService";
import { validateVideoToCreate } from "./utils/VideoServiceHelpers";
import { Video } from "@prisma/client";
import { validateId } from "@services/utils/serviceHelpers";

export class VideoService implements IVideoService {
  constructor(
    private getVideosFn: (ids: string[]) => Promise<Video[]>,
    private countVideosFn: (videoId: string) => Promise<number>,
    private createVideoFn: (video: VideoToUpsertType) => Promise<Video>
  ) {}

  getVideos = async (ids: string[]): Promise<Video[]> => {
    try {
      const validatedIds = ids.map((id) => {
        const validatedId = validateId(id);
        return validatedId;
      });
      return await this.getVideosFn(validatedIds);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  checkIfVideoExists = async (videoId: string): Promise<boolean> => {
    try {
      const validatedId = validateId(videoId);
      const count = await this.countVideosFn(validatedId);
      return count > 0;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  createVideo = async (video: VideoToUpsertType): Promise<Video> => {
    try {
      const validatedVideo = validateVideoToCreate(video);
      return await this.createVideoFn(validatedVideo);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
