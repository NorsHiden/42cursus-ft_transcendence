import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../typeorm/user.entity';
import { IAuthService } from '../interfaces/IAuthService.interface';
import { UserDto } from 'src/users/dto/userDto';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';
import { ConfigService } from '@nestjs/config';

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
  ) {}

  /**
   * @description Generate JWT
   * @param {User} user
   * @returns {string} JWT
   */
  generateJwt(user: User): string {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
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
  async signIn(req, res, state: string) {
    if (!req.user) throw new BadRequestException('Unauthenticated');

    const userExists = await this.usersService.findUserByEmail(req.user.email);

    if (!userExists) await this.usersService.createUser(req.user as UserDto);
    const token = this.generateJwt(userExists);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    if (!(await this.isVerified(req.user.email)).is_verified)
      return {
        url: `${this.configService.get('CLIENT_URL')}/postlogin?username=${
          req.user.username
        }&display_name=${req.user.display_name}&avatar=${req.user.avatar_url}`,
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
}
