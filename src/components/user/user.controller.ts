import { Request, Response } from "express";
import { z } from "zod";
import { IUserService } from "./user.interface";

// Controller class is in charge of:
// - Validating incoming requests
// - Business logic calling services
// - Sending responses

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = getUserRequestBodySchema.parse(req.body);
      const { userId } = body;
      const user = await this.userService.getUser({ id: userId });
      res.status(200).json(user);
      return;
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to retrieve user data");
    }
  };

  checkIfUserExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = checkIfUserExistsRequestBodySchema.parse(req.body);
      const { userId } = body;
      const userExists = await this.userService.checkIfUserExists({
        id: userId,
      });
      res.status(200).json(userExists);
      return;
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to check if user exists");
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = createUserRequestBodySchema.parse(req.body);
      const { userToCreate } = body;
      const createdUser = await this.userService.createUser({ userToCreate });
      res.status(201).json(createdUser);
      return;
    } catch (error: any) {
      console.log("error: ", error);
      res.status(400).json("Failed to create user");
    }
  };
}

// userid must be a string, so there is no need to check,
// but for the simplicity, zod is used to validate the request
const getUserRequestBodySchema = z.object({
  userId: z.string(),
});

const checkIfUserExistsRequestBodySchema = z.object({
  userId: z.string(),
});

const createUserRequestBodySchema = z.object({
  userId: z.string(),
  userToCreate: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().nullable(),
    avatar: z.string().nullable(),
  }),
});
