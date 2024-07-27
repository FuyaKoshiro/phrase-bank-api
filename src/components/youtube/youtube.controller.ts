import { Request, Response } from "express";
import { z } from "zod";
import { IYouTubeService } from "./youtube.interface";

export class YouTubeController {
  private youTubeService: IYouTubeService;

  constructor(youTubeService: IYouTubeService) {
    this.youTubeService = youTubeService;
  }

  getCaptions = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = getCaptionsRequestParamsSchema.parse(req.params);
      const { video_id: videoId } = params;

      const captions = await this.youTubeService.getCaptions({ videoId });
      res.status(200).json(captions);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to retrieve captions");
    }
  };

  getVideoData = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = getVideoDataRequestParamsSchema.parse(req.params);
      const { video_id: videoId } = params;

      const videoData = await this.youTubeService.getVideoData({ videoId });
      res.status(200).json(videoData);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to retrieve video data");
    }
  };

  searchVideos = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = searchVideosRequestParamsSchema.parse(req.params);
      const { search_query: searchQuery, start_index: startIndex } = params;

      const parsedStartIndex = z.number().min(0).parse(startIndex);

      const searchResults = await this.youTubeService.searchVideos({
        searchQuery,
        startIndex: parsedStartIndex,
      });
      res.status(200).json(searchResults);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to search for videos");
    }
  };
}

const getCaptionsRequestParamsSchema = z.object({
  video_id: z.string(),
});

const getVideoDataRequestParamsSchema = z.object({
  video_id: z.string(),
});

const searchVideosRequestParamsSchema = z.object({
  search_query: z.string(),
  start_index: z.string().transform((value) => {
    const parsedFloat = parseFloat(value);
    if (isNaN(parsedFloat)) {
      throw new Error("Invalid start index");
    }

    return parsedFloat;
  }),
});
