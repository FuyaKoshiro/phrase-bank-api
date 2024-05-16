import { z } from "zod";

const UserToCreateSchema = z.object({
  id: z.string().regex(/^\S+$/),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().regex(/^\S+$/).optional(),
});

export function validateUserToCreate(user: any) {
  try {
    return UserToCreateSchema.parse(user);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
