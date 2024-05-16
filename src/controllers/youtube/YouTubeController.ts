import { Request, Response } from "express";
import { IYouTubeService } from "@services/interfaces/IYouTubeService";

export class YouTubeController {
  private youTubeService: IYouTubeService;

  constructor(youTubeService: IYouTubeService) {
    this.youTubeService = youTubeService;
  }

  getCaptions = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoId = req.params.video_id as string;
      const captions = await this.youTubeService.getCaptions(videoId);
      res.status(200).json(captions);
    } catch (error: any) {
      res.status(400).json("Failed to retrieve captions");
    }
  };

  getVideoData = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoId = req.params.video_id as string;
      const videoData = await this.youTubeService.getVideoData(videoId);
      res.status(200).json(videoData);
    } catch (error: any) {
      res.status(400).json("Failed to retrieve video data");
    }
  };
}
