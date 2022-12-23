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
import { Comment, CommentServiceToken } from '.';
import { buildQueryFilter } from '@/utils/common';
import httpStatus from 'http-status';
import { protect } from '@/api/middlewares/protect';
import { JWTPayload } from '../auth/authSession.type';
import { BaseQuery, BaseServiceInput } from '@/types/Common';
import { RolesWeight } from '../user';
@Controller('/comments')
export class CommentController {
  private service = Container.get(CommentServiceToken);

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
    _body: Comment,
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
    _body: Comment,
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
    _body: Comment,
  ) {
    await this.service.delete({
      _id: _params.id,
      _content: _body,
      _subject: _auth._id,
    } as BaseServiceInput);
    _res.status(httpStatus.NO_CONTENT).end();
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
  @Patch('/upvote/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async upVote(
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
    const result = await this.service.upVote({
      _filter: filter,
      _query: query,
      _subject: _auth._id,
      _id: _params.id,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
  @Patch('/downvote/:id', [
    protect({
      weight: RolesWeight.user,
    }),
  ])
  async downVote(
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
    const result = await this.service.downVote({
      _filter: filter,
      _query: query,
      _subject: _auth._id,
      _id: _params.id,
    } as BaseServiceInput);
    _res.status(httpStatus.OK).json(result);
  }
}
