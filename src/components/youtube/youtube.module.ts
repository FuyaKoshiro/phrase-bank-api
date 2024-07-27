import { YouTubeController } from "./youtube.controller";
import { YouTubeRouter } from "./youtube.route";
import { YouTubeService } from "./youtube.service";

const youTubeService = new YouTubeService();
const youTubeController = new YouTubeController(youTubeService);
const youTubeRouter = new YouTubeRouter(youTubeController);

export default {
  route: youTubeRouter.getRouter(),
};
