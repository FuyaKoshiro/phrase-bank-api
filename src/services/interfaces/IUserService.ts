import { User } from "@prisma/client";

export type UserToCreateType = {
  id: string;
  email: string;
  name: string | null;
  avatar?: string | null;
};

export interface IUserService {
  getUser(id: string): Promise<User>;
  checkIfUserExists(email: string): Promise<boolean>;
  createUser(user: UserToCreateType): Promise<User>;
}
