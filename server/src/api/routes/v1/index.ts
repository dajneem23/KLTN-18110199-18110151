import { Application, Router } from 'express';
import { attachControllers } from '@/utils/expressDecorators';
import env from '@/config/env';
import { UserController, AuthController } from '@/modules';
import { StoryController } from '@/modules/story/story.controller';
import { MangaController } from '@/modules/manga/manga.controller';
import { NewsController } from '@/modules/articles/articles.controller';
import { FilmController } from '@/modules/film/film.controller';
import { CommentController } from '@/modules/comment/comment.controller';
import { ChatController } from '@/modules/chat/chat.controller';
import StorageController from '@/modules/storage/storage.controller';
import { CategoryController } from '@/modules/category/category.controller';

const route = Router();

export default (app: Application) => {
  app.use(`${env.API_PREFIX}/v1`, route);

  app.use('/health', (req, res) => {
    res.status(200).json({ status: 'ok-roi', code: 200 });
  });

  attachControllers(route, [UserController, AuthController]);

  attachControllers(route, [
    FilmController,
    NewsController,
    MangaController,
    StoryController,
    CommentController,
    ChatController,
    StorageController,
    CategoryController,
  ]);
};
