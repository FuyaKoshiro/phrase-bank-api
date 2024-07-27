import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRouter {
  private userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  getRouter() {
    const router = Router();

    router.get("/", this.userController.getUser);
    router.get("/check_if_user_exists", this.userController.checkIfUserExists);
    router.post("/", this.userController.createUser);

    return router;
  }
}
