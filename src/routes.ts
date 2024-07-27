import { NextFunction, Request, Response, Router } from "express";
import userModule from "./components/user/user.module";
import { validateAuthentication } from "./components/middlewares/authentication/authentication";
import phraseModule from "./components/phrase/phrase.module";
import videoModule from "./components/video/video.module";
import youtubeModule from "./components/youtube/youtube.module";

const defaultRoute = Router();

defaultRoute.use(async (req: Request, res: Response, next: NextFunction) => {
  await validateAuthentication(req, res, next);
});

defaultRoute.use("/user", userModule.route);
defaultRoute.use("/phrase", phraseModule.route);
defaultRoute.use("/video", videoModule.route);
defaultRoute.use("/youtube", youtubeModule.route);

export default defaultRoute;
