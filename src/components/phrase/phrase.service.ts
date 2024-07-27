import { Phrase } from "@prisma/client";
import { IPhraseService, PhraseToCreateType } from "./phrase.interface";
import prisma from "./../../utils/configs/prisma";

export class PostgreSQLPhraseService implements IPhraseService {
  getPhrasesByUserId = async ({
    userId,
  }: {
    userId: string;
  }): Promise<Phrase[]> => {
    const response = await prisma.phrase.findMany({
      where: {
        userId,
      },
    });

    return response;
  };

  checkIfPhraseExists = async ({
    userId,
    videoId,
    start,
  }: {
    userId: string;
    videoId: string;
    start: number;
  }): Promise<boolean> => {
    const response = await prisma.phrase.count({
      where: {
        userId,
        videoId,
        start,
      },
    });

    return response > 0;
  };

  createPhrase = async ({
    phraseToCreate,
  }: {
    phraseToCreate: PhraseToCreateType;
  }): Promise<Phrase> => {
    return await prisma.phrase.create({
      data: phraseToCreate,
    });
  };

  deletePhrase = async ({ phraseId }: { phraseId: string }): Promise<void> => {
    await prisma.phrase.delete({
      where: {
        id: phraseId,
      },
    });
  };
}
