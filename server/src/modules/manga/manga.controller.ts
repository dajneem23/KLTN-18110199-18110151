import Container from 'typedi';
import {
  Controller,
  Res,
  Post,
  Body,
  Get,
  Query,
  Put,
  Params,
  Delete,
  Req,
  Auth,
  Patch,
} from '@/utils/expressDecorators';
import { Request, Response } from 'express';
import { Manga, MangaServiceToken } from '.';
import { buildQueryFilter } from '@/utils/common';
import httpStatus from 'http-status';
import { protect } from '@/api/middlewares/protect';
import { JWTPayload } from '../auth/authSession.type';
import { BaseQuery, BaseServiceInput } from '@/types/Common';
import { RolesWeight } from '../user';
@Controller('/manga')
export class MangaController {
  private service = Container.get(MangaServiceToken);

  @Post('/', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async create(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Body()
    _body: Manga,
  ) {
    const result = await this.service.create({
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.CREATED).json(result);
  }

  @Get('/', [])
  async get(@Res() _res: Response, @Req() _req: Request, @Query() _query: BaseQuery) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.query({
      _filter: filter,
      _query: query,
      _permission: 'public',
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
  @Post('/chapter', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async createChapter(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Body()
    _body: Manga,
  ) {
    const result = await this.service.createChapter({
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.CREATED).json(result);
  }

  @Put('/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async update(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Params() _params: { id: string },
    @Body()
    _body: Manga,
  ) {
    const result = await this.service.update({
      _id: _params.id,
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.CREATED).json(result);
  }

  @Put('/chapter/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async updateChapter(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Params() _params: { id: string },
    @Body()
    _body: Manga,
  ) {
    const result = await this.service.updateChapter({
      _id: _params.id,
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.CREATED).json(result);
  }

  @Delete('/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async delete(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Params() _params: { id: string },
    @Body()
    _body: Manga,
  ) {
    await this.service.delete({
      _id: _params.id,
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.NO_CONTENT).end();
  }
  @Delete('/chapter/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async deleteChapter(
    @Res() _res: Response,
    @Auth() _auth: JWTPayload,
    @Req() _req: Request,
    @Params() _params: { id: string },
    @Body()
    _body: Manga,
  ) {
    await this.service.deleteChapter({
      _id: _params.id,
      _content: _body,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.NO_CONTENT).end();
  }
  @Get('/search', [])
  async search(@Res() _res: Response, @Req() _req: Request, @Query() _query: BaseQuery) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.search({
      _filter: filter,
      _query: query,
      _permission: 'public',
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }

  @Get('/:id', [])
  async getByIdPrivate(
    @Res() _res: Response,
    @Req() _req: Request,
    @Query() _query: BaseQuery,
    @Params()
    _params: {
      id: string;
    },
  ) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.getById({
      _id: _params.id,
      _filter: filter,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
  @Get('/chapter/:id', [])
  async getByIdChapter(
    @Res() _res: Response,
    @Req() _req: Request,
    @Query() _query: BaseQuery,
    @Params()
    _params: {
      id: string;
    },
  ) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.getChapterById({
      _id: _params.id,
      _filter: filter,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }

  @Patch('/react/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async react(@Res() _res: Response, @Req() _req: Request, @Query() _query: BaseQuery, @Auth() _auth: JWTPayload) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.react({
      _filter: filter,
      _query: query,
      _subject: _auth.id,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
}
