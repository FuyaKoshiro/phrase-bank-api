import { User } from "@prisma/client";
import { IUserService, UserToCreate } from "./user.interface";
import prisma from "./../../utils/configs/prisma";

export class PostgreSQLUserService implements IUserService {
  getUser = async ({ id }: { id: string }): Promise<User> => {
    const response = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      throw new Error("User not found");
    }

    return response;
  };

  async checkIfUserExists({ id }: { id: string }): Promise<boolean> {
    const response = await prisma.user.count({
      where: {
        id,
      },
    });

    return response > 0;
  }

  async createUser({
    userToCreate,
  }: {
    userToCreate: UserToCreate;
  }): Promise<User> {
    return await prisma.user.create({
      data: userToCreate,
    });
  }
}
