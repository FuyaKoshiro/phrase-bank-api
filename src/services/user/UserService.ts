import { User } from "@prisma/client";
import {
  IUserService,
  UserToCreateType,
} from "@services/interfaces/IUserService";
import { validateUserToCreate } from "./utils/userServiceHelpers";
import { validateId } from "@services/utils/serviceHelpers";

export class UserService implements IUserService {
  constructor(
    private getUserFn: (userId: string) => Promise<User>,
    private countUserFn: (userId: string) => Promise<number>,
    private createUserFn: (user: UserToCreateType) => Promise<User>
  ) {}

  getUser = async (id: string): Promise<User> => {
    try {
      const validatedUserId = validateId(id);
      return await this.getUserFn(validatedUserId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  checkIfUserExists = async (id: string): Promise<boolean> => {
    try {
      const validatedUserId = validateId(id);
      const count = await this.countUserFn(validatedUserId);
      return count > 0;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  createUser = async (user: UserToCreateType): Promise<User> => {
    try {
      const validatedUserToCreate = validateUserToCreate(user);
      return await this.createUserFn(validatedUserToCreate);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
