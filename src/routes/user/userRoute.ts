import { UserController } from "../../controllers/user/UserController";
import { NextFunction, Request, Response, Router } from "express";
import {
  countUser,
  createUser,
  getUser,
} from "../../repositories/userRepository/userRepository";
import { UserService } from "../../services/user/UserService";
import { verifyIdToken } from "../../repositories/authRepository/authRepository";
import { validateAuthentication } from "../../middlewares/validateAuthentication/validateAuthentication";

const userService = new UserService(getUser, countUser, createUser);
const userController = new UserController(userService);
export const userRoute = Router();

userRoute.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    validateAuthentication(req, res, next, verifyIdToken),
  userController.getUser
);
userRoute.get("/check_if_user_exists", userController.checkIfUserExists);
userRoute.post("/", userController.createUser);
