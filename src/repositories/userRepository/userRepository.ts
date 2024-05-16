import { PrismaClient, User } from "@prisma/client";
import { UserToCreateType } from "@services/interfaces/IUserService";

const prisma = new PrismaClient();

export const getUser = async (userId: string) => {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!response) {
    throw new Error("User not found");
  }

  return response as User;
};

export const countUser = async (userId: string) => {
  const response = await prisma.user.count({
    where: {
      id: userId,
    },
  });

  return response;
};

export const createUser = async ({
  id,
  email,
  name,
  avatar,
}: UserToCreateType) => {
  return await prisma.user.create({
    data: { id, email, name, avatar },
  });
};
