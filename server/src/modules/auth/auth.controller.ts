import { Response } from 'express';
import { Inject, Service } from 'typedi';
import AuthService from '@/modules/auth/auth.service';
import httpStatusCode from 'http-status';
import { Controller, Post, Res, Body, Auth } from '@/utils/expressDecorators';
import * as authValidation from './auth.validation';
import { protect } from '@/api/middlewares/protect';
import { JWTPayload } from '@/modules/auth/authSession.type';
import { env } from 'process';

@Service()
@Controller('/')
export class AuthController {
  @Inject()
  private authService: AuthService;

  // ----------------------------------------------------------------
  // PUBLIC ROUTES
  // ----------------------------------------------------------------

  /**
   * Register new account
   */
  @Post('/auth/register', [authValidation.register])
  async register(@Res() res: Response, @Body() body: any) {
    const result = await this.authService.register(body);
    return res.status(httpStatusCode.CREATED).json(result);
  }

  /**
   * Login by login ID and password
   */
  @Post('/auth/login', [authValidation.login])
  async login(@Res() res: Response, @Body() body: any) {
    const result = await this.authService.loginByIdAndPassword(body.loginId, body.password);
    res.cookie('access_token', result.tokens.access_token, {
      httpOnly: true,
      secure: env.MODE === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'none',
    });
    return res.status(httpStatusCode.OK).json(result);
  }

  /**
   * Refresh token
   */
  @Post('/auth/refresh', [authValidation.refresh])
  async refresh(@Res() res: Response, @Body() body: any) {
    const result = await this.authService.refreshAuthSession(body.user_id, body.refresh_token);
    return res.status(httpStatusCode.OK).json(result);
  }

  /**
   * Request email verification
   */
  @Post('/auth/request-email-verification', [authValidation.requestEmailVerification, protect()])
  async requestEmailVerification(@Res() res: Response, @Auth() auth: JWTPayload, @Body() body: any) {
    await this.authService.requestEmailVerification(auth.id, {
      redirect_uri: body.redirect_uri,
    });
    return res.status(httpStatusCode.NO_CONTENT).end();
  }

  /**
   * Verify email
   */
  @Post('/auth/verify-email', [authValidation.verifyEmail])
  async verifyEmail(@Res() res: Response, @Body() body: any) {
    const result = await this.authService.verifyEmail(body.email, body.token);
    return res.status(httpStatusCode.OK).json(result);
  }

  /**
   * Request password reset
   */
  @Post('/auth/request-password-reset', [authValidation.requestPasswordReset])
  async requestPasswordReset(@Res() res: Response, @Body() body: any) {
    await this.authService.requestPasswordReset(body.email, {
      redirect_uri: body.redirect_uri,
    });
    return res.status(httpStatusCode.NO_CONTENT).end();
  }

  /**
   * Reset password
   */
  @Post('/auth/reset-password', [authValidation.resetPassword])
  async resetPassword(@Res() res: Response, @Body() body: any) {
    await this.authService.resetPassword(body.email, body.token, body.new_password);
    return res.status(httpStatusCode.NO_CONTENT).end();
  }

  /**
   * Change password
   */
  @Post('/auth/change-password', [authValidation.changePassword, protect()])
  async changePassword(@Res() res: Response, @Auth() auth: JWTPayload, @Body() body: any) {
    await this.authService.changePassword(auth.id, body.current_password, body.new_password);
    return res.status(httpStatusCode.NO_CONTENT).end();
  }

  // ----------------------------------------------------------------
  // PRIVATE ROUTES
  // ----------------------------------------------------------------

  /**
   * [Private] Login to Dashboard
   */
  @Post('/private/auth/login', [authValidation.login])
  async privateLogin(@Res() res: Response, @Body() body: any) {
    const result = await this.authService.loginByIdAndPassword(body.id, body.password, ['admin']);
    return res.status(httpStatusCode.OK).json(result);
  }

  /**
   * [Private] Request password reset
   */
  @Post('/private/auth/request-password-reset', [authValidation.requestPasswordReset])
  async privateRequestPasswordReset(@Res() res: Response, @Body() body: any) {
    await this.authService.requestPasswordReset(body.email, {
      redirect_uri: body.redirect_uri,
    });
    return res.status(httpStatusCode.NO_CONTENT).end();
  }

  /**
   * [Private] Reset password
   */
  @Post('/private/auth/reset-password', [authValidation.resetPassword])
  async privateResetPassword(@Res() res: Response, @Body() body: any) {
    await this.authService.resetPassword(body.email, body.token, body.new_password);
    return res.status(httpStatusCode.NO_CONTENT).end();
  }
}
