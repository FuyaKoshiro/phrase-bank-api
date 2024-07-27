import { Request, Response, NextFunction } from "express";
import { firebaseAuthService } from "./firebase_auth.service";

export async function validateAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const decodedToken = await firebaseAuthService.verifyIdToken(token);

  if (!decodedToken) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }

  req.body = {
    ...req.body,
    userId: decodedToken.uid,
  };

  return next();
}
