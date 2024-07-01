import { verifyIdToken } from "../../repositories/authRepository/authRepository";
import {
  IAuthService,
  VerifyIdTokenResponse,
} from "@services/interfaces/IAuthService";

export class AuthService implements IAuthService {
  constructor(
    private verifyIdTokenFn: (
      token: string
    ) => Promise<VerifyIdTokenResponse | null>
  ) {}

  verifyIdToken(token: string): Promise<VerifyIdTokenResponse | null> {
    return this.verifyIdTokenFn(token);
  }
}

export const authService = new AuthService(verifyIdToken);
