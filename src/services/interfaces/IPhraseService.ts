import { Phrase } from "@prisma/client";

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

export interface IPhraseService {
  getPhrasesByUserId(userId: string): Promise<Phrase[]>;
  checkIfPhraseExists(
    userId: string,
    videoId: string,
    start: number
  ): Promise<boolean>;
  createPhrase(phrase: PhraseToCreateType): Promise<Phrase>;
  deletePhrase(phraseId: string): Promise<void>;
}
