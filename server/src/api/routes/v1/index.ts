import { Application, Router } from 'express';
import { attachControllers } from '@/utils/expressDecorators';
import env from '@/config/env';
import { UserController, AuthController } from '@/modules';
import { StoryController } from '@/modules/story/story.controller';
import { MangaController } from '@/modules/manga/manga.controller';
import { NewsController } from '@/modules/news/news.controller';
import { FilmController } from '@/modules/film/film.controller';

const route = Router();

export default (app: Application) => {
  app.use(`${env.API_PREFIX}/v1`, route);

  attachControllers(route, [UserController, AuthController]);

  attachControllers(route, [FilmController, NewsController, MangaController, StoryController]);
};
