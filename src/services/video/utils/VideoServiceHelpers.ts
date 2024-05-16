import { z } from "zod";

const VideoToCreateSchema = z.object({
  id: z.string().regex(/^\S+$/),
  title: z.string(),
});

export function validateVideoToCreate(video: any) {
  try {
    return VideoToCreateSchema.parse(video);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
