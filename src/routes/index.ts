import { NextFunction, Request, Response, Router } from "express";
import { phraseRoute } from "./phrase/phraseRoute";
import { userRoute } from "./user/userRoute";
import { youTubeRoute } from "./youTube/youTubeRoute";
import { validateAuthentication } from "../middlewares/validateAuthentication/validateAuthentication";
import { videoRoute } from "./video/videoRoute";
import { verifyIdToken } from "../repositories/authRepository/authRepository";

export const defaultRoute = Router();

defaultRoute.use(async (req: Request, res: Response, next: NextFunction) => {
  await validateAuthentication(req, res, next, verifyIdToken);
});

defaultRoute.use("/phrase", phraseRoute);
defaultRoute.use("/user", userRoute);
defaultRoute.use("/youtube", youTubeRoute);
defaultRoute.use("/video", videoRoute);

export default defaultRoute;
