import {
  IUserService,
  UserToCreateType,
} from "../../services/interfaces/IUserService";
import { UserService } from "./UserService";

describe("getUserById", () => {
  const mockedUser = {
    id: "1",
    email: "example@gmail.com",
    name: "John Doe",
    createdAt: new Date("2021-08-01T00:00:00.000Z"),
    updatedAt: new Date("2021-08-01T00:00:00.000Z"),
    lastLoginAt: new Date("2021-08-01T00:00:00.000Z"),
  };

  let userService: IUserService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedGetUser = jest.fn();
    mockedGetUser.mockResolvedValue(mockedUser);

    userService = new UserService(mockedGetUser, jest.fn(), jest.fn());
  });

  it("should return a user", async () => {
    const user = await userService.getUser("1");

    expect(user).toEqual(mockedUser);
  });

  it("should throw an error if the user id is invalid", async () => {
    await expect(async () => {
      await userService.getUser("invalid id");
    }).rejects.toThrow();
  });
});

describe("checkIfUserExists", () => {
  let userService: IUserService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedCheckIfUserExists = jest.fn();
    mockedCheckIfUserExists.mockResolvedValue(true);

    userService = new UserService(
      jest.fn(),
      mockedCheckIfUserExists,
      jest.fn()
    );
  });

  it("should return true if the user exists", async () => {
    const userExists = await userService.checkIfUserExists("1");

    expect(userExists).toEqual(true);
  });

  it("given an invalid userId, should throw", async () => {
    await expect(async () => {
      await userService.checkIfUserExists("invalid id");
    }).rejects.toThrow();
  });
});

describe("createUser", () => {
  const mockedUserToCreate = {
    id: "1",
    email: "example@gmail.com",
    name: "John Doe",
  };

  const mockedCreatedUser = {
    id: "1",
    email: "example@gmail.com",
    name: "John Doe",
    avatar: "avatar",
    createdAt: new Date("2021-08-01T00:00:00.000Z"),
    updatedAt: new Date("2021-08-01T00:00:00.000Z"),
    lastLoginAt: new Date("2021-08-01T00:00:00.000Z"),
  };

  let userService: IUserService;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedCreateUser = jest.fn();
    mockedCreateUser.mockResolvedValue(mockedCreatedUser);

    userService = new UserService(jest.fn(), jest.fn(), mockedCreateUser);
  });

  it("should create and return a user", async () => {
    const user = await userService.createUser(mockedUserToCreate);

    expect(user).toEqual(mockedCreatedUser);
  });

  it("should throw an error if the user data is invalid", async () => {
    const mockedInvalidUserToCreate = {
      email: "",
    };

    await expect(async () => {
      await userService.createUser(
        mockedInvalidUserToCreate as UserToCreateType
      );
    }).rejects.toThrow();
  });
});
