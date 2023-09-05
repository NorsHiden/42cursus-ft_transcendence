import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../../utils/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

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
    });
  }

  /**
   * @description Validate JWT
   * @param {JwtPayload} payload
   * @returns {Promise<object>} User
   * @throws {UnauthorizedException}
   */
  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
