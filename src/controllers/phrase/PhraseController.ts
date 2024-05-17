import { Request, Response } from "express";
import { IPhraseService } from "../../services/interfaces/IPhraseService";

export class PhraseController {
  private phraseService: IPhraseService;

  constructor(phraseService: IPhraseService) {
    this.phraseService = phraseService;
  }

  getPhrasesByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.userId as string;
      const phrases = await this.phraseService.getPhrasesByUserId(userId);
      res.status(200).json(phrases);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to retrieve phrases");
    }
  };

  checkIfPhraseExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const { video_id: videoId, start } = req.params;
      const startNumber = Number(start);
      const userId = req.body.userId as string;
      const phraseExists = await this.phraseService.checkIfPhraseExists(
        userId,
        videoId,
        startNumber
      );
      res.status(200).json(phraseExists);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to check if phrase exists");
    }
  };

  createPhrase = async (req: Request, res: Response): Promise<void> => {
    try {
      const phrase = req.body;
      const createdPhrase = await this.phraseService.createPhrase(phrase);
      res.status(201).json(createdPhrase);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to create phrase");
    }
  };

  deletePhrase = async (req: Request, res: Response): Promise<void> => {
    try {
      const phraseId = req.params.phrase_id as string;
      await this.phraseService.deletePhrase(phraseId);
      res.status(200).json("Phrase deleted");
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json("Failed to delete phrase");
    }
  };
}
