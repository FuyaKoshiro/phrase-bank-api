import admin from "configs/firebase";
import { z } from "zod";

class FirebaseAuthService {
  private admin = admin.auth();

  verifyIdToken = async (token: string) => {
    const response = await this.admin.verifyIdToken(token);
    const parsedResponse = verifyIdTokenResponseSchema.parse(response);
    return parsedResponse;
  };
}

export const firebaseAuthService = new FirebaseAuthService();

const verifyIdTokenResponseSchema = z.object({
  name: z.string(),
  picture: z.string().url(),
  iss: z.string(),
  aud: z.string(),
  auth_time: z.number(),
  user_id: z.string(),
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
  email: z.string().email(),
  email_verified: z.boolean(),
  firebase: z.object({
    identities: z.object({
      "google.com": z.array(z.string()),
      email: z.array(z.string().email()),
    }),
    sign_in_provider: z.string(),
  }),
  uid: z.string(),
});
