import { Router } from "express";
import { PhraseController } from "./phrase.controller";

export class PhraseRouter {
  private phraseController: PhraseController;

  constructor(phraseController: PhraseController) {
    this.phraseController = phraseController;
  }

  getRouter() {
    const router = Router();

    router.get("/", this.phraseController.getPhraseByUserId);
    router.get(
      "/check_if_phrase_exists/:video_id/:start",
      this.phraseController.checkIfPhraseExists
    );
    router.post("/", this.phraseController.createPhrase);
    router.delete("/:phrase_id", this.phraseController.deletePhrase);

    return router;
  }
}
