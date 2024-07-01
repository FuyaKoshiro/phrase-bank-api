import { Request, Response } from "express";
import { IYouTubeService } from "../../services/interfaces/IYouTubeService";
import { z } from "zod";

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
      console.log(error.message);
      res.status(400).json("Failed to retrieve captions");
    }
  };

  getVideoData = async (req: Request, res: Response): Promise<void> => {
    try {
      const videoId = req.params.video_id as string;
      const videoData = await this.youTubeService.getVideoData(videoId);
      res.status(200).json(videoData);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to retrieve video data");
    }
  };

  searchVideos = async (req: Request, res: Response): Promise<void> => {
    try {
      const searchQuery = req.params.search_query;
      const startIndex = parseInt(req.params.start_index);
      const parsedStartIndex = z.number().min(0).parse(startIndex);
      const searchResults = await this.youTubeService.searchVideos(
        searchQuery,
        parsedStartIndex
      );
      res.status(200).json(searchResults);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to search for videos");
    }
  };
}
