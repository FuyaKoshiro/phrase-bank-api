import { IAuthService } from "@services/interfaces/IAuthService";
import { AuthService } from "./AuthService";

describe("verifyIdToken", () => {
  const mockedResponse = {
    name: "John Doe",
    picture: "https://example.com/profile.jpg",
    iss: "https://example.com",
    aud: "1234567890",
    auth_time: 1634567890,
    user_id: "1234567890",
    sub: "1234567890",
    iat: 1634567890,
    exp: 1634567890,
    email: "john.doe@example.com",
    email_verified: true,
    firebase: {
      identities: {
        "google.com": ["1234567890"],
        email: ["john.doe@example.com"],
      },
      sign_in_provider: "google.com",
    },
    uid: "1234567890",
  };

  let authService: IAuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    const mockedVerifyIdToken = jest.fn();
    mockedVerifyIdToken.mockResolvedValue(mockedResponse);

    authService = new AuthService(mockedVerifyIdToken);
  });

  it("should return the user data if the token is valid", async () => {
    const response = await authService.verifyIdToken("valid");
    expect(response).toEqual(mockedResponse);
  });
});
