import prisma from "./../../utils/configs/prisma";
import { IVideoService, VideoToUpsertType } from "./video.interface";

export class PostgreSQLVideoService implements IVideoService {
  getVideos = async ({ ids }: { ids: string[] }) => {
    const response = await prisma.video.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return response;
  };

  checkIfVideoExists = async ({ videoId }: { videoId: string }) => {
    const response = await prisma.video.count({
      where: {
        id: videoId,
      },
    });

    return response > 0;
  };

  createVideo = async ({
    videoToCreate,
  }: {
    videoToCreate: VideoToUpsertType;
  }) => {
    return await prisma.video.create({
      data: videoToCreate,
    });
  };
}
