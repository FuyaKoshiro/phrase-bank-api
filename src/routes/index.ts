import { NextFunction, Request, Response, Router } from "express";
import { phraseRoute } from "./phrase/phraseRoute";
import { userRoute } from "./user/userRoute";
import { youTubeRoute } from "./youTube/youTubeRoute";
import admin from "../configs/firebase";
import { validateAuthentication } from "../middlewares/validateAuthentication/validateAuthentication";
import { videoRoute } from "./video/videoRoute";

export const defaultRoute = Router();

async function verifyIdToken(token: string) {
  return admin.auth().verifyIdToken(token);
}

defaultRoute.use((req: Request, res: Response, next: NextFunction) =>
  validateAuthentication(req, res, next, verifyIdToken)
);

defaultRoute.use("/phrase", phraseRoute);
defaultRoute.use("/user", userRoute);
defaultRoute.use("/youtube", youTubeRoute);
defaultRoute.use("/video", videoRoute);

export default defaultRoute;
