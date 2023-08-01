import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm/User';
import { Repository } from 'typeorm';
import { IAuthService } from '../interfaces/IAuthService.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(user: User): string {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }

  async signIn(user: User): Promise<string> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const userExists = await this.findUser(user.id);

    if (!userExists) return this.registerUser(user);

    return this.generateJwt(userExists);
  }

  async registerUser(user: User): Promise<string> {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return this.generateJwt(newUser);
    } catch (error) {
      throw new InternalServerErrorException("Couldn't register user");
    }
  }

  async findUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
}
