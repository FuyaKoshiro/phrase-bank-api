import { VideoController } from "@controllers/video/VideoController";
import { Router } from "express";
import {
  getVideos,
  countVideos,
  createVideo,
} from "@repositories/videoRepository/videoRepository";
import { VideoService } from "@services/video/VideoService";

const videoService = new VideoService(getVideos, countVideos, createVideo);
const videoController = new VideoController(videoService);
export const videoRoute = Router();

videoRoute.post("/fetch_videos", videoController.getVideos);
videoRoute.get(
  "/check_if_video_exists/:video_id",
  videoController.checkIfVideoExists
);
videoRoute.post("/", videoController.createVideo);
