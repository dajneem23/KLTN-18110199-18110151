import { Inject, Service } from 'typedi';
import Logger from '@/core/logger';
import VerificationTokenModel from '@/modules/verificationToken/verificationToken.model';
import { alphabetSize12, numbersSize4, numbersSize6 } from '@/utils/randomString';
import { VerificationToken } from '@/modules/verificationToken/verificationToken.type';
import { toVerificationTokenOutput } from '@/modules/verificationToken/verificationToken.util';
import { throwErr } from '@/utils/common';
import { VerificationTokenError } from '@/modules/verificationToken/verificationToken.error';
import { Filter, WithId } from 'mongodb';
import { MailJob } from '@/modules/mailer/mail.job';
import { encodeBase64 } from '@/utils/base64';
import dayjs from 'dayjs';
import ms from 'ms';
import env from '@/config/env';
import { User, UserOutput } from '@/modules/user/user.type';
import { JWTPayload } from '@/modules/auth/authSession.type';

@Service()
export default class VerificationTokenService {
  private logger = new Logger('VerificationTokenService');

  @Inject()
  private verificationTokenModel: VerificationTokenModel;

  @Inject()
  private emailQueue: MailJob;

  /**
   * Generate token and send "request email verification" email
   */
  async sendEmailVerification(user: User | UserOutput, opts: { redirect_uri: string }) {
    try {
      const token = await numbersSize6();
      const { value: verificationToken } = await this.verificationTokenModel.collection.findOneAndUpdate(
        { type: 'email_verification', email: user.email },
        {
          $set: {
            id: await alphabetSize12(),
            token,
            url: `${opts.redirect_uri}/${encodeBase64(JSON.stringify({ email: user.email, token }))}`,
            expires: dayjs().add(ms(env.VERIFY_EMAIL_TOKEN_EXP), 'ms').toDate(),
            created_at: new Date(),
          },
        },
        { upsert: true, returnDocument: 'after' },
      );
      // Send email
      this.emailQueue.addJob({
        name: 'request-email-verification',
        data: {
          to: user.email,
          params: {
            'user-fullname': user.full_name,
            'verify-url': verificationToken.url,
          },
        },
      });
      this.logger.debug('[sendEmailVerification:success]', { email: user.email, token });
      return toVerificationTokenOutput(verificationToken);
    } catch (err) {
      this.logger.error('[sendEmailVerification:error]', err);
      throw err;
    }
  }

  /**
   * Generate token and send "request password reset" email
   */
  async sendPasswordReset(user: User | UserOutput | any, opts: { redirect_uri: string }) {
    try {
      const token = await numbersSize6();
      const { value: verificationToken } = await this.verificationTokenModel.collection.findOneAndUpdate(
        { type: 'password_reset', email: user.email },
        {
          $set: {
            id: await alphabetSize12(),
            token,
            url: `${opts.redirect_uri}/${encodeBase64(JSON.stringify({ email: user.email, token }))}`,
            expires: dayjs().add(ms(env.RESET_PASSWORD_TOKEN_EXP), 'ms').toDate(),
            created_at: new Date(),
          },
        },
        { upsert: true, returnDocument: 'after' },
      );
      // Send email
      this.emailQueue.addJob({
        name: 'request-password-reset',
        data: {
          to: user.email,
          params: {
            'user-fullname': user.full_name,
            'reset-password-code': verificationToken.token,
            'reset-password-url': verificationToken.url,
          },
        },
      });
      this.logger.debug('[sendPasswordReset:success]', { email: user.email, token });
      return toVerificationTokenOutput(verificationToken);
    } catch (err) {
      this.logger.error('[sendPasswordReset:error]', err);
      throw err;
    }
  }

  /**
   * Generate token and send "confirm request code" email
   */
  async sendConfirmRequestCode(user: User | UserOutput | JWTPayload) {
    try {
      const token = await numbersSize4();
      const { value: verificationToken } = await this.verificationTokenModel.collection.findOneAndUpdate(
        { type: 'confirm_request', email: user.email },
        {
          $set: {
            id: await alphabetSize12(),
            token,
            expires: dayjs().add(ms(env.CONFIRM_REQUEST_TOKEN_EXP), 'ms').toDate(),
            created_at: new Date(),
          },
        },
        { upsert: true, returnDocument: 'after' },
      );
      // Send email
      this.emailQueue.addJob({
        name: 'confirm-request',
        data: {
          to: user.email,
          params: {
            'user-fullname': user.full_name,
            'confirm-request-code': verificationToken.token,
          },
        },
      });
      this.logger.debug('[sendConfirmationCode:success]', { email: user.email, token });
      return toVerificationTokenOutput(verificationToken);
    } catch (err) {
      this.logger.error('[sendConfirmationCode:error]', err);
      throw err;
    }
  }

  /**
   * Verify and delete a verification token
   */
  async verifyAndDelete(filter: Filter<VerificationToken>) {
    try {
      const { value: verificationToken } = await this.verificationTokenModel.collection.findOneAndDelete(filter);
      if (!verificationToken) throwErr(new VerificationTokenError('INVALID_VERIFICATION_TOKEN'));
      this.logger.debug('[delete:success]', { filter });
      return toVerificationTokenOutput(verificationToken);
    } catch (err) {
      this.logger.error('[delete:error]', err);
      throw err;
    }
  }
}
