import { Router } from "express";
import { YouTubeController } from "./youtube.controller";

export class YouTubeRouter {
  private youTubeController: YouTubeController;

  constructor(youTubeController: YouTubeController) {
    this.youTubeController = youTubeController;
  }

  getRouter() {
    const router = Router();

    router.get("/:video_id/fetch_captions", this.youTubeController.getCaptions);
    router.get(
      "/:video_id/fetch_video_data_from_youtube",
      this.youTubeController.getVideoData
    );
    router.get(
      "/search/:search_query/:start_index",
      this.youTubeController.searchVideos
    );

    return router;
  }
}
