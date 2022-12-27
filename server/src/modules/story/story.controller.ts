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
import { Story, StoryServiceToken } from '.';
import { buildQueryFilter } from '@/utils/common';
import httpStatus from 'http-status';
import { protect } from '@/api/middlewares/protect';
import { JWTPayload } from '../auth/authSession.type';
import { BaseQuery, BaseServiceInput } from '@/types/Common';
import { RolesWeight } from '../user';
@Controller('/stories')
export class StoryController {
  private service = Container.get(StoryServiceToken);

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
    _body: Story,
  ) {
    const result = await this.service.create({
      _content: _body,
      _subject: _auth._id,
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
    _body: Story,
  ) {
    const result = await this.service.update({
      _id: _params.id,
      _content: _body,
      _subject: _auth._id,
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
    _body: Story,
  ) {
    await this.service.delete({
      _id: _params.id,
      _content: _body,
      _subject: _auth._id,
    } as BaseServiceInput);
    _res.status(httpStatus.NO_CONTENT).end();
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
  @Get('/following', [
    protect({
      ignoreException: true,
    }),
  ])
  async getFollowing(
    @Res() _res: Response,
    @Req() _req: Request,
    @Query() _query: BaseQuery,
    @Auth() auth: JWTPayload,
  ) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.queryFollowing({
      _filter: filter,
      _query: query,
      _permission: 'public',
      _subject: auth._id,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }

  @Get('/my', [protect()])
  async getMy(@Res() _res: Response, @Req() _req: Request, @Query() _query: BaseQuery, @Auth() auth: JWTPayload) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.getMy({
      _filter: filter,
      _query: query,
      _permission: 'public',
      _subject: auth._id,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
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
  @Get('/user/:id', [])
  async getByUserId(
    @Res() _res: Response,
    @Req() _req: Request,
    @Query() _query: BaseQuery,
    @Params()
    _params: {
      id: string;
    },
  ) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.getByUserId({
      _filter: filter,
      _query: query,
      _id: _params.id,
      _permission: 'public',
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
  @Patch('/react/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async react(
    @Res() _res: Response,
    @Req() _req: Request,
    @Query() _query: BaseQuery,
    @Auth() _auth: JWTPayload,
    @Params()
    _params: {
      id: string;
    },
  ) {
    const { filter, query } = buildQueryFilter(_query);
    const result = await this.service.react({
      _slug: _params.id,
      _filter: filter,
      _query: query,
      _subject: _auth._id,
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
      _slug: _params.id,
      _filter: filter,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
}
