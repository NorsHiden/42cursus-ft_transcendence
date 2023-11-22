import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../typeorm/user.entity';
import { IAuthService } from '../interfaces/IAuthService.interface';
import { UserDto } from 'src/users/dto/userDto';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/utils/types';
import { authenticator } from 'otplib';
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';

/**
 * @description Service for Auth
 * @export
 * @class AuthService
 * @implements {IAuthService}
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Services.Users) private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
  ) {}

  /**
   * @description Generate JWT
   * @param {User} user
   * @returns {string} JWT
   */
  generateJwt(user: User, isverified: boolean = false): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      is_2fa_enabled: user.is_2fa_enabled,
      is_2fa_verified: isverified,
    });
  }

  /**
   * @description Sign in user
   * @param req Request
   * @param res Response
   * @param state URL state
   * @returns {Promise<string>} JWT
   * @throws {BadRequestException}
   * @throws {InternalServerErrorException}
   */
  async signIn(
    req: any,
    @Res({ passthrough: true }) res: Response,
    state: string,
  ) {
    if (!req.user) throw new BadRequestException('Unauthenticated');

    let user = await this.usersService.findUserByEmail(req.user.email);

    if (!user) user = await this.usersService.createUser(req.user as UserDto);
    const token = this.generateJwt(user);
    res.cookie('access_token', token, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
    });
    await this.achievementService.setAchievement(user.id, 'welcome_aboard');
    if (!(await this.isVerified(req.user.email)).is_verified)
      return {
        url: `${this.configService.get('CLIENT_URL')}/postlogin?username=${
          req.user.username
        }&display_name=${req.user.display_name}&avatar=${user.profile.avatar}`,
      };
    if (req.user.is_2fa_enabled && !req.user.is_2fa_verified)
      return {
        url: `${this.configService.get('CLIENT_URL')}/2fa-verification`,
      };
    return { url: `${this.configService.get('CLIENT_URL')}/${state}` };
  }

  /**
   * @description Check if user is verified
   * @param {string} id
   * @returns {Promise<{ statusCode: number; is_verified: boolean }>} { statusCode: number; is_verified: boolean }
   * @throws {InternalServerErrorException}
   */
  async isVerified(
    email: string,
  ): Promise<{ statusCode: number; is_verified: boolean }> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) return { statusCode: 200, is_verified: false };
    return { statusCode: 200, is_verified: user.verified };
  }

  /**
   * @description Generate a secret key for two-factor authentication (2FA) and return the OTP authentication URL.
   * @param {string} user_id - User ID.
   * @returns {Promise<string>} - OTP authentication URL.
   * @throws {ForbiddenException} - If 2FA is already enabled for the user.
   */
  async generateTwoFactorAuthenticationSecret(
    user_id: string,
  ): Promise<string> {
    const user = await this.usersService.getUser(user_id);

    if (user.is_2fa_enabled) {
      throw new ForbiddenException('2fa is already enabled');
    }

    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'AUTH_PONG', secret);

    user._2fa_secret = secret;
    await this.usersService.setUser(user);

    return otpauthUrl;
  }

  /**
   * @description Turn on two-factor authentication (2FA) for a user after verifying the provided authentication code.
   * @param {JwtPayload} payload - JWT payload containing the user's subject (sub).
   * @param {string} auth_code - Authentication code entered by the user.
   * @param {Response} res - Response object for setting cookies and sending a response.
   * @returns {Promise<void>} - Promise with no result.
   * @throws {UnauthorizedException} - If the provided authentication code is invalid.
   */
  async turnOnTwoFactorAuthentication(
    payload: JwtPayload,
    auth_code: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.usersService.getUser(payload.sub);

    const isCodeValid = authenticator.verify({
      token: auth_code,
      secret: user._2fa_secret,
    });

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    user.is_2fa_enabled = true;
    await this.usersService.setUser(user);

    const verifiedToken = this.generateJwt(user, true);
    res.cookie('access_token', verifiedToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
    });

    res.send({
      verification: true,
    });
  }

  /**
   * @description Turn off two-factor authentication (2FA) for a user.
   * @param {string} user_id - User ID.
   * @param {Response} res - Response object for setting cookies and sending a response.
   * @returns {Promise<void>} - Promise with no result.
   */
  async turnOffTwoFactorAuthentication(
    user_id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const user = await this.usersService.getUser(user_id);

    user.is_2fa_enabled = false;
    user._2fa_secret = '';
    await this.usersService.setUser(user);

    const unverifiedToken = this.generateJwt(user, false);
    res.cookie('access_token', unverifiedToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
    });

    res.send({
      verification: false,
    });
  }
}
