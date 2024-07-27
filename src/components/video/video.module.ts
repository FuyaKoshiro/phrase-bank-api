import { VideoController } from "./video.controller";
import { VideoRouter } from "./video.route";
import { PostgreSQLVideoService } from "./video.service";

const videoService = new PostgreSQLVideoService();
const videoController = new VideoController(videoService);
const videoRouter = new VideoRouter(videoController);

export default {
  route: videoRouter.getRouter(),
};
