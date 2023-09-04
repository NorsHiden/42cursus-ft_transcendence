import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm/user.entity';
import { Repository } from 'typeorm';
import { IAuthService } from '../interfaces/IAuthService.interface';
import { Profile } from 'src/typeorm/profile.entity';

/**
 * @description Service for Auth
 * @export
 * @class AuthService
 * @implements {IAuthService}
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
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
   * @param {User} user
   * @returns {Promise<string>} JWT
   * @throws {BadRequestException}
   * @throws {InternalServerErrorException}
   */
  async signIn(user: User): Promise<string> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const userExists = await this.findUser(user.email);

    if (!userExists) return this.registerUser(user);

    return this.generateJwt(userExists);
  }

  /**
   * @description Register user
   * @param {User} user
   * @returns {Promise<string>} JWT
   * @throws {InternalServerErrorException}
   */
  async registerUser(user): Promise<string> {
    try {
      const newProfile = new Profile();
      newProfile.about = 'I am a new user';
      newProfile.avatar = '';
      newProfile.banner = '';
      const newUser = this.userRepository.create({
        username: user.username,
        display_name: user.display_name,
        email: user.email,
        verified: false,
        profile: newProfile,
      });
      await this.userRepository.save(newUser);
      return this.generateJwt(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Couldn't register user");
    }
  }

  /**
   * @description Find user
   * @param {string} email
   * @returns {Promise<User>} User
   * @throws {InternalServerErrorException}
   * @throws {BadRequestException}
   * @throws {ForbiddenException}
   * @throws {NotFoundException}
   * @throws {UnauthorizedException}
   */
  async findUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        profile: true,
      },
    });
  }

  /**
   * @description Check if user is verified
   * @param {string} id
   * @returns {Promise<{ statusCode: number; is_verified: boolean }>} { statusCode: number; is_verified: boolean }
   * @throws {InternalServerErrorException}
   */
  async isVerified(
    id: string,
  ): Promise<{ statusCode: number; is_verified: boolean }> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) return { statusCode: 200, is_verified: false };
    return { statusCode: 200, is_verified: user.verified };
  }
}
