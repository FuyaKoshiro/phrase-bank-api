import { PhraseService } from "@services/phrase/PhraseService";
import { PhraseController } from "@controllers/phrase/PhraseController";
import { Router } from "express";
import {
  countPhrase,
  createPhrase,
  deletePhrase,
  getPhrasesByUserId,
} from "@repositories/phraseRepository/phraseRepository";

const phraseService = new PhraseService(
  getPhrasesByUserId,
  countPhrase,
  createPhrase,
  deletePhrase
);
const phraseController = new PhraseController(phraseService);
export const phraseRoute = Router();

phraseRoute.get("/", phraseController.getPhrasesByUserId);
phraseRoute.get("/check_if_phrase_exists/:video_id/:start", phraseController.checkIfPhraseExists);
phraseRoute.post("/", phraseController.createPhrase);
phraseRoute.delete("/:phrase_id", phraseController.deletePhrase);
