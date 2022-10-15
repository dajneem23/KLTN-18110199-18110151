import { Service } from 'typedi';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import MailgunClient from 'mailgun.js/dist/lib/client';
import env from '@/config/env';
import {
  RequestEmailVerificationParams,
  RequestPasswordResetParams,
  PasswordChangedConfirmationParams,
  RequestEmailChangeParams,
  SendByMailgunInput,
  ConfirmRequestCodeParams,
  GivingRequestSubscriptionParams,
  ConfirmEmailParams,
} from './mail.type';
import Logger from '@/core/logger';

@Service()
export default class MailService {
  private logger = new Logger('MailService');
  private mailgunClient: MailgunClient;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.mailgunClient = mailgun.client({ username: 'api', key: env.MAILGUN_API_KEY });
  }

  /**
   * Send email by Mailgun client
   *
   * @private
   */
  private async sendByMailgun({ to, subject, template, params }: SendByMailgunInput) {
    try {
      const response = await this.mailgunClient.messages.create(env.MAILGUN_DOMAIN, {
        from: 'ShareViet <no-reply@shareviet.vn>',
        to: [to],
        subject,
        template,
        'h:X-Mailgun-Variables': JSON.stringify(params),
      });
      this.logger.debug('[sendByMailgun:success]', { response });
      return response;
    } catch (err) {
      this.logger.error('[sendByMailgun:error]', err);
    }
  }

  /**
   * Send request password reset
   */
  sendRequestPasswordReset(to: string, params: RequestPasswordResetParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: 'Khôi phục tài khoản ShareViet',
      template: 'reset-password',
    });
  }

  /**
   * Send request email verification
   */
  sendRequestEmailVerification(to: string, params: RequestEmailVerificationParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: `Chào ${params['user-fullname']}, vui lòng xác thực tài khoản ShareViet của bạn`,
      template: 'verify-email',
    });
  }

  /**
   * Send password changed confirmation
   */
  sendPasswordChangedConfirmation(to: string, params: PasswordChangedConfirmationParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: 'Mật khẩu tài khoản ShareViet đã được cập nhật thành công',
      template: 'confirm-password-changed',
    });
  }

  /**
   * Send request email change
   */
  sendRequestEmailChange(to: string, params: RequestEmailChangeParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: 'Yêu cầu thay đổi email cho tài khoản ShareViet',
      template: 'change-email-confirm-new',
    });
  }

  /**
   * Send request confirmation code
   */
  sendConfirmRequestCode(to: string, params: ConfirmRequestCodeParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: 'Xác minh yêu cầu',
      template: 'confirm-request',
    });
  }

  /**
   * Send giving request subscription
   */
  sendGivingRequestSubscription(to: string, params: GivingRequestSubscriptionParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: params['product-name'],
      template: 'giving-item-subscription',
    });
  }

  /**
   * Send giving request subscription
   */
  sendSpecifiedGivingRequestSubscription(to: string, params: GivingRequestSubscriptionParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: params['product-name'],
      template: 'specified-item-subscription',
    });
  }

  /**
   * Send email confirm order
   */
  sendConfirmOrder(to: string, params: ConfirmEmailParams) {
    return this.sendByMailgun({
      to,
      params,
      subject: params['product-name'],
      template: 'confirm-order',
    });
  }
}
