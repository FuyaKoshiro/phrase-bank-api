import { IVideoService } from "../../services/interfaces/IVideoService";
import { Request, Response } from "express";

export class VideoController {
  private videoService: IVideoService;

  constructor(videoService: IVideoService) {
    this.videoService = videoService;
  }

  getVideos = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoIds = req.body.videoIds as string[];
      const video = await this.videoService.getVideos(videoIds);
      res.status(200).json(video);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.status(400).json("Failed to retrieve video data");
    }
  };

  checkIfVideoExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoId = req.params.video_id as string;
      const videoExists = await this.videoService.checkIfVideoExists(videoId);
      res.status(200).json(videoExists);
    } catch (error: any) {
      console.log(error);
      res.status(400).json("Failed to check if video exists");
    }
  };

  createVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoData = req.body.videoData;
      const video = await this.videoService.createVideo(videoData);
      res.status(200).json(video);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.status(400).json("Failed to create video");
    }
  };
}
