import { VerifyIdTokenResponse } from "@repositories/authRepository/schema";
import { Request, Response, NextFunction } from "express";

export async function validateAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
  verifyIdTokenFn: (token: string) => Promise<VerifyIdTokenResponse | null>
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decodedToken = await verifyIdTokenFn(token);

    if (!decodedToken) {
      throw new Error("Unauthorized: Verification failed");
    }

    req.body = {
      ...req.body,
      userId: decodedToken.uid,
    };

    return next();
  } catch (error: any) {
    return res.status(401).send();
  }
}
