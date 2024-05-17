import { Request, Response } from "express";
import { IUserService } from "../../services/interfaces/IUserService";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.userId as string;
      if (userId) {
        const user = await this.userService.getUser(userId);
        console.log("user to return", user);
        res.status(200).json(user);
        return;
      }
    } catch (error: any) {
      res.status(400).json("Failed to retrieve user data");
    }
  };

  checkIfUserExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.userId as string;
      const userExists = await this.userService.checkIfUserExists(userId);
      res.status(200).json(userExists);
    } catch (error: any) {
      res.status(400).json("Failed to check if user exists");
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json("Failed to create user");
    }
  };
}
