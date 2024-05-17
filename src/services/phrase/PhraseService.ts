import { Phrase } from "@prisma/client";
import {
  IPhraseService,
  PhraseToCreateType,
} from "../../services/interfaces/IPhraseService";
import {
  modifyPhraseToCreate,
  validatePhraseToCreate,
} from "./utils/phraseServiceHelpers";
import { validateId } from "../../services/utils/serviceHelpers";

export class PhraseService implements IPhraseService {
  constructor(
    private getPhrasesByUserIdFn: (userId: string) => Promise<Phrase[]>,
    private countPhrasesByUserIdAndStartFn: (
      userId: string,
      videoId: string,
      start: number
    ) => Promise<number>,
    private createPhraseFn: (phrase: PhraseToCreateType) => Promise<Phrase>,
    private deletePhraseFn: (phraseId: string) => Promise<void>
  ) {}

  getPhrasesByUserId = async (userId: string): Promise<Phrase[]> => {
    try {
      const validatedUserId = validateId(userId);
      return await this.getPhrasesByUserIdFn(validatedUserId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  checkIfPhraseExists = async (
    userId: string,
    videoId: string,
    start: number
  ): Promise<boolean> => {
    try {
      const validatedUserId = validateId(userId);
      const count = await this.countPhrasesByUserIdAndStartFn(
        validatedUserId,
        videoId,
        start
      );

      return count > 0;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  createPhrase = async (phrase: PhraseToCreateType): Promise<Phrase> => {
    try {
      const modifiedPhrase = modifyPhraseToCreate(phrase);
      const validatedPhrase = validatePhraseToCreate(modifiedPhrase);
      return await this.createPhraseFn(validatedPhrase);
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };

  deletePhrase = async (phraseId: string): Promise<void> => {
    try {
      const validatedPhraseId = validateId(phraseId);
      return await this.deletePhraseFn(validatedPhraseId);
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
}
