export type SendByMailgunInput = {
  to: string;
  subject: string;
  template: string;
  params: { [key: string]: string | number };
};

export type RequestPasswordResetParams = {
  'user-fullname': string;
  'reset-password-url': string;
  'reset-password-code': string;
};

export type RequestEmailVerificationParams = {
  'user-fullname': string;
  'verify-url': string;
};

export type PasswordChangedConfirmationParams = {
  'user-fullname': string;
};

export type RequestEmailChangeParams = {
  'user-fullname': string;
  'new-email': string;
  'confirm-link': string;
};

export type ConfirmRequestCodeParams = {
  'user-fullname': string;
  'confirm-request-code': string;
};

export type GivingRequestSubscriptionParams = {
  'user-fullname': string;
  'product-name': string;
  'product-id': string;
  'product-image-url': string;
  'product-description': string;
  'product-address': string;
  'product-detail-url': string;
};

export type ConfirmEmailParams = {
  'user-fullname': string;
  'product-name': string;
  'product-id': string;
  'product-image-url': string;
  'product-description': string;
  'product-address': string;
  'receiver-name': string;
  'receiver-phone': string;
  'receiver-fulladdress': string;
};

export type SendRequestEmailVerificationJob = {
  name: 'request-email-verification';
  data: {
    to: string;
    params: RequestEmailVerificationParams;
  };
};

export type SendRequestPasswordResetJob = {
  name: 'request-password-reset';
  data: {
    to: string;
    params: RequestPasswordResetParams;
  };
};

export type SendPasswordChangedConfirmationJob = {
  name: 'password-changed';
  data: {
    to: string;
    params: PasswordChangedConfirmationParams;
  };
};

export type SendRequestEmailChangeJob = {
  name: 'request-email-change';
  data: {
    to: string;
    params: RequestEmailChangeParams;
  };
};

export type SendConfirmRequestCodeJob = {
  name: 'confirm-request';
  data: {
    to: string;
    params: ConfirmRequestCodeParams;
  };
};

export type SendGivingRequestSubscriptionJob = {
  name: 'giving-request-subscription';
  data: {
    to: string;
    params: GivingRequestSubscriptionParams;
  };
};

export type SendSpecifiedGivingRequestSubscriptionJob = {
  name: 'specified-giving-request-subscription';
  data: {
    to: string;
    params: GivingRequestSubscriptionParams;
  };
};

export type SendConfirmOrderJob = {
  name: 'confirm-order';
  data: {
    to: string;
    params: ConfirmEmailParams;
  };
};

export type JobData =
  | SendRequestEmailVerificationJob
  | SendRequestPasswordResetJob
  | SendPasswordChangedConfirmationJob
  | SendRequestEmailChangeJob
  | SendConfirmRequestCodeJob
  | SendGivingRequestSubscriptionJob
  | SendSpecifiedGivingRequestSubscriptionJob
  | SendConfirmOrderJob;
