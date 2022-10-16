import { Inject, Service } from 'typedi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { omit, pick, intersection, uniq } from 'lodash';
import dayjs from 'dayjs';
import Logger from '@/core/logger';
import AuthSessionModel from '@/modules/auth/authSession.model';
import { throwErr } from '@/utils/common';
import { AuthError } from '@/modules/auth/auth.error';
import { UserService } from '@/modules/user/user.service';
import { toUserOutput } from '@/modules/user/user.util';
import { AuthSession, BearerTokens, JWTPayload, RegisterInput } from '@/modules/auth/authSession.type';
import { User, UserOutput, UserRole } from '@/modules/user/user.type';
import env from '@/config/env';
import { alphabetSize12, alphabetSize24 } from '@/utils/randomString';
import { UserError } from '@/modules/user/user.error';
import { MailJob } from '@/modules/mailer/mail.job';
import VerificationTokenService from '@/modules/verificationToken/verificationToken.service';
import { Filter, WithId } from 'mongodb';
// import { DIRedisClient } from '@/loaders/redisClientLoader';
import { RedisClientType } from 'redis';

@Service()
export default class AuthService {
  private logger = new Logger('AuthService');

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private verificationTokenService: VerificationTokenService;

  @Inject()
  private userService: UserService;

  // @Inject()
  // private emailQueue: MailJob;

  // constructor(@Inject(DIRedisClient) private redisClient: RedisClientType) {}

  /**
   * Hash password
   */
  static hashPassword(pwd: string) {
    return bcrypt.hash(pwd, 12);
  }

  /**
   * Verify password
   */
  static verifyPassword(pwd: string, hash: string) {
    return bcrypt.compare(pwd, hash);
  }

  /**
   * Generate Bearer tokens
   */
  static async generateBearerTokens(user: User | UserOutput) {
    const payload: JWTPayload = pick(user, 'id', 'email', 'email_verified', 'name', 'picture', 'roles');
    const bearerTokens: BearerTokens = {
      // token_type: 'bearer',
      access_token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_TOKEN_EXP }),
      expires_in: ms(env.JWT_ACCESS_TOKEN_EXP) / 1000,
      refresh_token: await alphabetSize24(), // e.g. tZ5zeBsZxuNEZrfa2lvex2H3
      refresh_expires_in: ms(env.JWT_REFRESH_TOKEN_EXP) / 1000,
    };
    return bearerTokens;
  }

  /**
   * Verify Bearer tokens
   */
  static verifyBearerTokens(accessToken: string) {
    try {
      const jwtDecoded: any = jwt.verify(accessToken, env.JWT_SECRET);
      return omit(jwtDecoded, ['iat', 'exp']) as JWTPayload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') throwErr(new AuthError('ACCESS_TOKEN_EXPIRED'));
      if (err.name === 'JsonWebTokenError') throwErr(new AuthError('INVALID_ACCESS_TOKEN'));
      throw err;
    }
  }

  /**
   * Register new account
   */
  async register(input: RegisterInput) {
    try {
      // Hash password
      const hashedPassword = await AuthService.hashPassword(input.password);
      // Create new user
      const user = await this.userService.create({ ...input, password: hashedPassword });
      // Generate new auth session
      const { tokens } = await this.generateAuthSession(user);
      this.logger.debug('[register:success]', { email: user.email });
      return { user, tokens };
    } catch (err) {
      this.logger.error('[register:error]', err);
      throw err;
    }
  }

  /**
   * Login by login ID and password
   *
   * @param loginID The Login ID (Username or Email)
   * @param password The user password
   * @param whiteListRoles Allowed roles
   */
  async loginByIdAndPassword(loginID: string, password: string, whiteListRoles: UserRole[] = ['user']) {
    try {
      // Get user
      const user = (await this.userService.model._collection.findOne({ email: loginID })) as WithId<User>;
      // Check password
      if (!user || !(await AuthService.verifyPassword(password, user.password))) {
        throwErr(new AuthError('INCORRECT_LOGIN_ID_OR_PASSWORD'));
      }
      // Check whitelist roles
      // if (!intersection(user.roles, whiteListRoles).length) {
      //   throwErr(new AuthError('PERMISSION_DENIED'));
      // }
      // Check account suspended
      if (user.status === 'suspended') {
        throwErr(new AuthError('ACCOUNT_SUSPENDED'));
      }
      // Generate new auth session
      const { tokens } = await this.generateAuthSession(user);
      this.logger.debug('[loginByPassword:success]');
      return { user: toUserOutput(user), tokens };
    } catch (err) {
      this.logger.error('[loginByPassword:error]', err);
      throw err;
    }
  }

  /**
   * Generate new auth session
   */
  async generateAuthSession(user: User | UserOutput | any) {
    try {
      // Generate tokens
      const bearerTokens = await AuthService.generateBearerTokens(user);
      // Create new auth session
      const now = new Date();
      // TODO: Get IP and Device from request
      const authSession: AuthSession = {
        id: await alphabetSize12(),
        user_id: user.id,
        ip: '0.0.0.0',
        device_name: 'Test',
        refresh_token: bearerTokens.refresh_token,
        expires: dayjs().add(ms(env.JWT_REFRESH_TOKEN_EXP), 'ms').toDate(),
        created_at: now,
        updated_at: now,
      };
      await this.authSessionModel.collection.insertOne(authSession);
      this.logger.debug('[generateNewAuthSession:success]');
      return { session: authSession, tokens: bearerTokens };
    } catch (err) {
      this.logger.error('[generateNewAuthSession:error]', err);
      throw err;
    }
  }

  /**
   * Refresh auth session
   */
  async refreshAuthSession(userId: User['id'], refreshToken: BearerTokens['refresh_token']) {
    try {
      // Find user
      const user = await this.userService.getById(userId);
      // Check account suspended
      if (user.status === 'suspended') {
        throwErr(new AuthError('ACCOUNT_SUSPENDED'));
      }
      // Generate tokens
      const bearerTokens = await AuthService.generateBearerTokens(user);
      // Update current auth session
      const { value: authSession } = await this.authSessionModel.collection.findOneAndUpdate(
        { user_id: userId, refresh_token: refreshToken },
        {
          $set: {
            refresh_token: bearerTokens.refresh_token,
            expires: dayjs().add(ms(env.JWT_REFRESH_TOKEN_EXP), 'ms').toDate(),
            updated_at: new Date(),
          },
        },
      );
      if (!authSession) throwErr(new AuthError('INVALID_REFRESH_TOKEN'));
      this.logger.debug('[refreshAuthSession:success]');
      return bearerTokens;
    } catch (err) {
      this.logger.error('[refreshAuthSession:error]', err);
      throw err;
    }
  }

  /**
   * Request email verification
   */
  async requestEmailVerification(userId: string, opts: { redirect_uri: string }) {
    try {
      // Check user exists
      const user = (await this.userService.model._collection.findOne({ id: userId })) as WithId<User>;
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      if (user.email_verified) throwErr(new UserError('EMAIL_ALREADY_VERIFIED'));
      // Generate token and send email
      const verificationToken = await this.verificationTokenService.sendEmailVerification(user, opts);
      this.logger.debug('[requestEmailVerification:success]', { email: user.email, token: verificationToken.token });
    } catch (err) {
      this.logger.error('[requestEmailVerification:error]', err);
      throw err;
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(email: string, token: string) {
    try {
      // Find and remove verification token
      await this.verificationTokenService.verifyAndDelete({
        type: 'email_verification',
        email,
        token,
      });
      // Update user
      const { value: user } = await this.userService.model._collection.findOneAndUpdate(
        { email },
        { $set: { email_verified: true } },
        { returnDocument: 'after' },
      );
      this.logger.debug('[verifyEmail:success]', { email, token });
      return toUserOutput(user as WithId<User>);
    } catch (err) {
      this.logger.error('[verifyEmail:error]', err);
      throw err;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string, opts: { redirect_uri: string }) {
    try {
      // Check user exists
      const user = await this.userService.model._collection.findOne({ email });
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      // Generate token and send email
      const verificationToken = await this.verificationTokenService.sendPasswordReset(user, opts);
      this.logger.debug('[requestPasswordReset:success]', { token: verificationToken.token });
    } catch (err) {
      this.logger.error('[requestPasswordReset:error]', err);
      throw err;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string, token: string, newPassword: string) {
    try {
      // Find and remove verification token
      await this.verificationTokenService.verifyAndDelete({
        type: 'password_reset',
        email,
        token,
      });
      // Update user password
      const { value: user } = await this.userService.model._collection.findOneAndUpdate(
        { email },
        {
          $set: { password: await AuthService.hashPassword(newPassword) },
        },
      );
      // Send email
      // this.emailQueue.addJob({
      //   name: 'password-changed',
      //   data: {
      //     to: email,
      //     params: {
      //       'user-fullname': user.full_name,
      //     },
      //   },
      // });
      this.logger.debug('[resetPassword:success]', { email });
    } catch (err) {
      this.logger.error('[resetPassword:error]', err);
      throw err;
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      // Find user
      const user = await this.userService.model._collection.findOne({ id: userId });
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      // Check valid: current password & new password
      const [isValidPassword, sameAsCurrentPassword] = await Promise.all([
        AuthService.verifyPassword(currentPassword, user.password),
        AuthService.verifyPassword(newPassword, user.password),
      ]);
      if (!isValidPassword) throwErr(new AuthError('INCORRECT_PASSWORD'));
      if (sameAsCurrentPassword) throwErr(new AuthError('INVALID_NEW_PASSWORD'));
      // Update user password
      await this.userService.model._collection.findOneAndUpdate(
        { id: userId },
        {
          $set: { password: await AuthService.hashPassword(newPassword) },
        },
      );
      // Send email
      // this.emailQueue.addJob({
      //   name: 'password-changed',
      //   data: {
      //     to: user.email,
      //     params: {
      //       'user-fullname': user.full_name,
      //     },
      //   },
      // });
      this.logger.debug('[changePassword:success]', { email: user.email });
    } catch (err) {
      this.logger.error('[changePassword:error]', err);
      throw err;
    }
  }

  /**
   * Find and remove auth session
   */
  async findAndRemoveAuthSession(filter: Filter<AuthSession>) {
    try {
      const result = await this.authSessionModel.collection.deleteMany(filter);
      this.logger.debug('[findAndRemoveAuthSession:success]', { result });
      return result.deletedCount;
    } catch (err) {
      this.logger.error('[findAndRemoveAuthSession:error]', err);
      throw err;
    }
  }

  /**
   * Set user roles
   */
  async setUserRoles(userId: string, roles: UserRole[]) {
    try {
      // Modify and update user roles
      const uniqRoles = uniq<UserRole>(roles); // [admin, user, user] => [admin, user]
      const user = await this.userService.update(userId, { roles: uniqRoles });
      // Remove all current auth sessions and force the user to login again
      await this.findAndRemoveAuthSession({ user_id: userId });
      this.logger.debug('[setUserRoles:success]', { email: user.email, roles });
      return user;
    } catch (err) {
      this.logger.error('[setUserRoles:error]', err.message);
      throw err;
    }
  }
}
