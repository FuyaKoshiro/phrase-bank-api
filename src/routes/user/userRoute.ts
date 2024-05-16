import { UserController } from "@controllers/user/UserController";
import { Router } from "express";
import {
  countUser,
  createUser,
  getUser,
} from "@repositories/userRepository/userRepository";
import { UserService } from "@services/user/UserService";

const userService = new UserService(getUser, countUser, createUser);
const userController = new UserController(userService);
export const userRoute = Router();

userRoute.get("/", userController.getUser);
userRoute.get("/check_if_user_exists", userController.checkIfUserExists);
userRoute.post("/", userController.createUser);
