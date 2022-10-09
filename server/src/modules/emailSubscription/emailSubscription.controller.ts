import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Auth, Res, Get, Put, Body, Params } from '@/utils/expressDecorators';
import { Response } from 'express';
import { protect, protect } from '@/api/middlewares/protect';
import { JWTPayload } from '@/modules/auth/authSession.type';
import EmailSubscriptionService from '@/modules/emailSubscription/emailSubscription.service';
import * as emailSubscriptionValidation from './emailSubscription.validation';

@Service()
@Controller('/')
export default class EmailSubscriptionController {
  @Inject()
  private emailSubscriptionService: EmailSubscriptionService;

  // ----------------------------------------------------------------
  // PUBLIC ROUTES
  // ----------------------------------------------------------------

  @Get('/email-subscription', [protect()])
  async get(@Res() res: Response, @Auth() auth: JWTPayload) {
    const result = await this.emailSubscriptionService.getEmailSubscription(auth.id);
    res.status(httpStatusCode.OK).json(result);
  }

  @Put('/email-subscription', [emailSubscriptionValidation.update, protect()])
  async update(@Res() res: Response, @Auth() auth: JWTPayload, @Body() body: any) {
    const result = await this.emailSubscriptionService.updateEmailSubscription(auth.id, body);
    res.status(httpStatusCode.OK).json(result);
  }

  // ----------------------------------------------------------------
  // PRIVATE ROUTES
  // ----------------------------------------------------------------

  @Get('/private/users/:id/email-subscription', [protect()])
  async privateGet(@Res() res: Response, @Params() params: { id: string }) {
    const result = await this.emailSubscriptionService.getEmailSubscription(params.id);
    res.status(httpStatusCode.OK).json(result);
  }

  @Put('/private/users/:id/email-subscription', [emailSubscriptionValidation.update, protect()])
  async privateUpdate(@Res() res: Response, @Params() params: { id: string }, @Body() body: any) {
    const result = await this.emailSubscriptionService.updateEmailSubscription(params.id, body);
    res.status(httpStatusCode.OK).json(result);
  }
}
