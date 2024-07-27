import { Request, Response } from "express";
import { z } from "zod";
import { IVideoService } from "./video.interface";

export class VideoController {
  private videoService: IVideoService;

  constructor(videoService: IVideoService) {
    this.videoService = videoService;
  }

  getVideos = async (req: Request, res: Response) => {
    try {
      const body = getVideosRequestBodySchema.parse(req.body);
      const { videoIds: ids } = body;

      const videos = await this.videoService.getVideos({
        ids,
      });

      res.status(200).json(videos);
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to retrieve video data");
    }
  };

  checkIfVideoExists = async (req: Request, res: Response) => {
    try {
      const params = checkIfVideoExistsRequestParamsSchema.parse(req.params);
      const { video_id: videoId } = params;

      const videoExists = await this.videoService.checkIfVideoExists({
        videoId,
      });

      res.status(200).json(videoExists);
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to check if video exists");
    }
  };

  createVideo = async (req: Request, res: Response) => {
    try {
      const body = createVideoRequestBodySchema.parse(req.body);
      const { videoToCreate } = body;

      const video = await this.videoService.createVideo({
        videoToCreate,
      });

      res.status(201).json(video);
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to create video");
    }
  };
}

const getVideosRequestBodySchema = z.object({
  userId: z.string(),
  videoIds: z.array(z.string()),
});

const checkIfVideoExistsRequestParamsSchema = z.object({
  video_id: z.string(),
});

const createVideoRequestBodySchema = z.object({
  userId: z.string(),
  videoToCreate: z.object({
    id: z.string(),
    title: z.string(),
  }),
});
