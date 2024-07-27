import { PhraseController } from "./phrase.controller";
import { PhraseRouter } from "./phrase.route";
import { PostgreSQLPhraseService } from "./phrase.service";

const phraseService = new PostgreSQLPhraseService();
const phraseController = new PhraseController(phraseService);
const phraseRouter = new PhraseRouter(phraseController);

export default {
  route: phraseRouter.getRouter(),
};
