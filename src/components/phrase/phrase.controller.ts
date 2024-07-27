import { z } from "zod";
import { Request, Response } from "express";
import { IPhraseService } from "./phrase.interface";

export class PhraseController {
  private phraseService: IPhraseService;

  constructor(phraseService: IPhraseService) {
    this.phraseService = phraseService;
  }

  getPhraseByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = getPhraseByUserIdRequestBodySchema.parse(req.body);
      const { userId } = body;
      const phrases = await this.phraseService.getPhrasesByUserId({ userId });
      res.status(200).json(phrases);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to retrieve phrases");
    }
  };

  checkIfPhraseExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = checkIfPhraseExistsRequestParamsSchema.parse(req.params);
      const body = checkIfPhraseExistsRequestBodySchema.parse(req.body);
      const { video_id: videoId, start } = params;
      const { userId } = body;

      const phraseExists = await this.phraseService.checkIfPhraseExists({
        userId,
        videoId,
        start,
      });
      res.status(200).json(phraseExists);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to check if phrase exists");
    }
  };

  createPhrase = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = createPhraseRequestSchema.parse(req.body);
      const { phraseToCreate } = body;

      const createdPhrase = await this.phraseService.createPhrase({
        phraseToCreate,
      });
      res.status(201).json(createdPhrase);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to create phrase");
    }
  };

  deletePhrase = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = deletePhraseRequestParamsSchema.parse(req.params);
      const { phrase_id: phraseId } = params;

      await this.phraseService.deletePhrase({ phraseId });
      res.status(200).json("Phrase deleted");
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to delete phrase");
    }
  };
}

const getPhraseByUserIdRequestBodySchema = z.object({
  userId: z.string(),
});

const checkIfPhraseExistsRequestParamsSchema = z.object({
  video_id: z.string(),
  start: z.string().transform((val) => {
    const parsedFloat = parseFloat(val);

    if (isNaN(parsedFloat)) {
      throw new Error("Invalid start parameter");
    }

    return parsedFloat;
  }),
});

const checkIfPhraseExistsRequestBodySchema = z.object({
  userId: z.string(),
});

const createPhraseRequestSchema = z.object({
  userId: z.string(),
  phraseToCreate: z.object({
    userId: z.string(),
    videoId: z.string(),
    text: z.string(),
    start: z.number(),
    end: z.number(),
    archivedAt: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const deletePhraseRequestParamsSchema = z.object({
  phrase_id: z.string(),
});
