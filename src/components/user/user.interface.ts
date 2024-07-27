import { User } from "@prisma/client";
import { z } from "zod";

// Both the controller and the service depend on this interface

export interface IUserService {
  getUser({ id }: { id: string }): Promise<User>;
  checkIfUserExists({ id }: { id: string }): Promise<boolean>;
  createUser({ userToCreate }: { userToCreate: UserToCreate }): Promise<User>;
}

export type UserToCreate = {
  id: string;
  email: string;
  name: string | null;
  avatar?: string | null;
};
