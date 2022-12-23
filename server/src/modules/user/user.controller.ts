import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Auth, Body, Controller, Get, Params, Put, Post, Patch, Query, Res, Delete } from '@/utils/expressDecorators';
import { UserService, userValidation } from '.';
import { Response } from 'express';
import { protect } from '@/api/middlewares/protect';
import { JWTPayload } from '@/modules/auth/authSession.type';
import { buildQueryFilter } from '@/utils/common';
import AuthService from '@/modules/auth/auth.service';

@Service()
@Controller('/')
export class UserController {
  @Inject()
  private userService: UserService;

  @Inject()
  private authService: AuthService;

  // ----------------------------------------------------------------
  // PUBLIC ROUTES
  // ----------------------------------------------------------------

  @Get('/users/me', [protect({})])
  async getMe(@Res() res: Response, @Auth() auth: JWTPayload) {
    const user = await this.userService.getById(auth._id);
    res.status(httpStatusCode.OK).json(user);
  }

  @Put('/users/me', [userValidation.updateMe, protect()])
  async updateMe(@Res() res: Response, @Body() body: any, @Auth() auth: JWTPayload) {
    const user = await this.userService.update(auth._id, body);
    res.status(httpStatusCode.OK).json(user);
  }

  @Patch('/users/follow_user/:id', [protect()])
  async followUser(
    @Res() res: Response,
    @Body() body: any,
    @Auth() auth: JWTPayload,
    @Params() params: { id: string },
  ) {
    const user = await this.userService.followUser({
      _id: params.id,
      _subject: auth._id,
      _content: {},
    });
    res.status(httpStatusCode.OK).json(user);
  }
  @Patch('/users/follow_category/:id', [protect()])
  async followCategory(
    @Res() res: Response,
    @Body() body: any,
    @Auth() auth: JWTPayload,
    @Params() params: { id: string },
  ) {
    const user = await this.userService.followCategory({
      _id: params.id,
      _subject: auth._id,
      _content: {},
    });
    res.status(httpStatusCode.OK).json(user);
  }
  // ----------------------------------------------------------------
  // PRIVATE ROUTES
  // ----------------------------------------------------------------

  @Get('/private/users', [userValidation.privateQuery, protect()])
  async privateQuery(@Res() res: Response, @Query() query: any) {
    const opts = buildQueryFilter(query);
    const result = await this.userService.query(opts.filter, opts.query);
    res.status(httpStatusCode.OK).json(result);
  }

  @Get('/private/users/me', [protect()])
  async privateGetMe(@Res() res: Response, @Auth() auth: JWTPayload) {
    const user = await this.userService.getById(auth._id);
    res.status(httpStatusCode.OK).json(user);
  }

  @Put('/private/users/me', [userValidation.updateMe, protect()])
  async privateUpdateMe(@Res() res: Response, @Body() body: any, @Auth() auth: JWTPayload) {
    const user = await this.userService.update(auth._id, body);
    res.status(httpStatusCode.OK).json(user);
  }

  @Get('/private/users/:id', [protect()])
  async privateGetUser(@Res() res: Response, @Params() params: { id: string }) {
    const user = await this.userService.getById(params.id);
    res.status(httpStatusCode.OK).json(user);
  }

  @Post('/private/users', [])
  async privateCreateUser(@Res() res: Response, @Body() body: any) {
    const user = await this.userService.create(body);
    res.status(httpStatusCode.CREATED).json(user);
  }

  @Put('/private/users/:id', [userValidation.privateCreateUpdateUser, protect()])
  async privateUpdateUser(@Res() res: Response, @Body() body: any, @Params() params: { id: string }) {
    const user = await this.userService.update(params.id, body);
    res.status(httpStatusCode.OK).json(user);
  }

  @Delete('/private/users/:id', [protect()])
  async privateDeleteUser(@Res() res: Response, @Params() params: { id: string }) {
    await this.userService.deleteUserAccount(params.id);
    res.status(httpStatusCode.NO_CONTENT).end();
  }

  @Patch('/private/users/:id/suspend', [protect()])
  async privateSuspendUser(@Res() res: Response, @Params() params: { id: string }) {
    await this.userService.suspend(params.id);
    res.status(httpStatusCode.NO_CONTENT).end();
  }

  @Patch('/private/users/:id/unsuspend', [protect()])
  async privateUnsuspendUser(@Res() res: Response, @Params() params: { id: string }) {
    await this.userService.unsuspend(params.id);
    res.status(httpStatusCode.NO_CONTENT).end();
  }

  @Patch('/private/users/:id/set-roles', [userValidation.privateSetRoles, protect()])
  async privateSetUserRoles(@Res() res: Response, @Body() body: any, @Params() params: { id: string }) {
    const user = await this.authService.setUserRoles(params.id, body.roles);
    res.status(httpStatusCode.OK).json(user);
  }
}
