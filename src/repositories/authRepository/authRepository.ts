import admin from "../../configs/firebase";
import { VerifyIdTokenResponse } from "./schema";

export const verifyIdToken = async (
  token: string
): Promise<VerifyIdTokenResponse | null> => {
  return await admin.auth().verifyIdToken(token);
};
