import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../../utils/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 * @description JWT Strategy
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy, 'jwt')}
 * @property {User} userRepository - Repository for User
 * @property {ConfigService} configService - Service for Config
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    /**
     * @description Extract JWT from cookie or header
     * @param {Request} req
     * @returns {string} JWT
     */
    const JwtCookieExtractor = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: JwtCookieExtractor,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  /**
   * @description Validate JWT
   * @param {JwtPayload} payload
   * @returns {Promise<object>} User
   * @throws {UnauthorizedException}
   */
  async validate(req: Request, payload: JwtPayload) {
    const user = await this.userRepository.findOneBy({ email: payload.email });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    if (
      payload.is_2fa_enabled &&
      !req.path.includes('2fa/verify') &&
      !req.path.includes('users/@me') &&
      !payload.is_2fa_verified
    )
      throw new ForbiddenException('2fa not verified');

    return payload;
  }
}
