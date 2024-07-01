import { NextFunction, Request, Response, Router } from "express";
import { phraseRoute } from "./phrase/phraseRoute";
import { userRoute } from "./user/userRoute";
import { youTubeRoute } from "./youTube/youTubeRoute";
import { validateAuthentication } from "../middlewares/validateAuthentication/validateAuthentication";
import { videoRoute } from "./video/videoRoute";
import { verifyIdToken } from "../repositories/authRepository/authRepository";

export const defaultRoute = Router();

defaultRoute.use((req: Request, res: Response, next: NextFunction) =>
  validateAuthentication(req, res, next, verifyIdToken)
);

defaultRoute.use(
  "/phrase",
  (req: Request, res: Response, next: NextFunction) =>
    validateAuthentication(req, res, next, verifyIdToken),
  phraseRoute
);
defaultRoute.use("/user", userRoute);
defaultRoute.use(
  "/youtube",
  (req: Request, res: Response, next: NextFunction) =>
    validateAuthentication(req, res, next, verifyIdToken),
  youTubeRoute
);
defaultRoute.use(
  "/video",
  (req: Request, res: Response, next: NextFunction) =>
    validateAuthentication(req, res, next, verifyIdToken),
  videoRoute
);

export default defaultRoute;
