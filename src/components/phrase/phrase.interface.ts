import { Phrase } from "@prisma/client";

export interface IPhraseService {
  getPhrasesByUserId({ userId }: { userId: string }): Promise<Phrase[]>;
  checkIfPhraseExists({
    userId,
    videoId,
    start,
  }: {
    userId: string;
    videoId: string;
    start: number;
  }): Promise<boolean>;
  createPhrase({
    phraseToCreate,
  }: {
    phraseToCreate: PhraseToCreateType;
  }): Promise<Phrase>;
  deletePhrase({ phraseId }: { phraseId: string }): Promise<void>;
}

export type PhraseToCreateType = {
  userId: string;
  videoId: string;
  text: string;
  start: number;
  end: number;
  archivedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
