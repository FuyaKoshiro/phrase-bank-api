import { Phrase, PrismaClient } from "@prisma/client";
import { PhraseToCreateType } from "@services/interfaces/IPhraseService";

const prisma = new PrismaClient();

export const getPhrasesByUserId = async (userId: string): Promise<Phrase[]> => {
  const response = await prisma.phrase.findMany({
    where: {
      userId: userId,
    },
  });
  return response;
};

export const countPhrase = async (
  userId: string,
  videoId: string,
  start: number
): Promise<number> => {
  const response = await prisma.phrase.count({
    where: {
      userId: userId,
      videoId: videoId,
      start: start,
    },
  });
  return response;
};

export const createPhrase = async (
  phrase: PhraseToCreateType
): Promise<Phrase> => {
  const response = await prisma.phrase.create({
    data: phrase,
  });
  return response;
};

export const deletePhrase = async (phraseId: string): Promise<void> => {
  await prisma.phrase.delete({
    where: {
      id: phraseId,
    },
  });
};
