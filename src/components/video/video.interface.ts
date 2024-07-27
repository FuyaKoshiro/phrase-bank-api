import { Video } from "@prisma/client";

export interface IVideoService {
  getVideos: ({ ids }: { ids: string[] }) => Promise<Video[]>;
  checkIfVideoExists: ({ videoId }: { videoId: string }) => Promise<boolean>;
  createVideo: ({
    videoToCreate,
  }: {
    videoToCreate: VideoToUpsertType;
  }) => Promise<Video>;
}

export type VideoToUpsertType = {
  id: string;
  title: string;
};
