import { z } from "zod";
const UserIdSchema = z.string().regex(/^\S+$/);

export function validateId(userId: any) {
  try {
    return UserIdSchema.parse(userId);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
