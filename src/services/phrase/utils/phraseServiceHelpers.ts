import { z } from "zod";

const PhraseToCreateSchema = z.object({
  userId: z.string().regex(/^\S+$/),
  videoId: z.string().regex(/^\S+$/),
  text: z.string(),
  start: z.number(),
  end: z.number(),
});

export function validatePhraseToCreate(phrase: any) {
  try {
    return PhraseToCreateSchema.parse(phrase);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function modifyPhraseToCreate(phrase: any) {
  const newPhrase = {
    ...phrase,
    start: Number(Number(phrase.start).toFixed(1)),
    end: Number(Number(phrase.end).toFixed(1)),
  };

  return newPhrase;
}
