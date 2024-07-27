import { Router } from "express";
import { VideoController } from "./video.controller";

export class VideoRouter {
  private videoController: VideoController;

  constructor(videoController: VideoController) {
    this.videoController = videoController;
  }

  getRouter() {
    const router = Router();

    router.post("/fetch_videos", this.videoController.getVideos);
    router.get(
      "/check_if_video_exists/:video_id",
      this.videoController.checkIfVideoExists
    );
    router.post("/", this.videoController.createVideo);

    return router;
  }
}
