import { PrismaClient } from "@prisma/client";
import { VideoToUpsertType } from "@services/interfaces/IVideoService";

const prisma = new PrismaClient();

export const getVideos = async (videoIds: string[]) => {
  const response = await prisma.video.findMany({
    where: {
      id: {
        in: videoIds,
      },
    },
  });

  if (!response) {
    throw new Error("Video not found");
  }

  return response;
};

export const countVideos = async (videoId: string) => {
  return await prisma.video.count({
    where: {
      id: videoId,
    },
  });
};

export const createVideo = async (videoData: VideoToUpsertType) => {
  return await prisma.video.create({
    data: videoData,
  });
};
