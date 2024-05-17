import { YouTubeController } from "../../controllers/youtube/YouTubeController";
import { Router } from "express";
import {
  getTranscript,
  getVideoData,
} from "../../repositories/youTubeRepository/youTubeRepository";
import { YouTubeService } from "../../services/youTubeService/YouTubeService";

const youTubeService = new YouTubeService(getTranscript, getVideoData);
const youTubeController = new YouTubeController(youTubeService);

export const youTubeRoute = Router();

youTubeRoute.get("/:video_id/fetch_captions", youTubeController.getCaptions);
youTubeRoute.get(
  "/:video_id/fetch_video_data_from_youtube",
  youTubeController.getVideoData
);
