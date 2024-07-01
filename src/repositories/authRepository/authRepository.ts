import { VerifyIdTokenResponse } from "@services/interfaces/IAuthService";
import admin from "../../configs/firebase";

export const verifyIdToken = async (
  token: string
): Promise<VerifyIdTokenResponse | null> => {
  return await admin.auth().verifyIdToken(token);
};
