import { Video } from "@prisma/client";

export type VideoToUpsertType = {
  id: string;
  title: string;
};

export interface IVideoService {
  getVideos: (ids: string[]) => Promise<Video[]>;
  checkIfVideoExists: (videoId: string) => Promise<boolean>;
  createVideo: (video: VideoToUpsertType) => Promise<Video>;
}
