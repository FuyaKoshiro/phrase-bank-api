import { UserController } from "./user.controller";
import { UserRouter } from "./user.route";
import { PostgreSQLUserService } from "./user.service";

const userService = new PostgreSQLUserService();
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default {
  route: userRouter.getRouter(),
};
