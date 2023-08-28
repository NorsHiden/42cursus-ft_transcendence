import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getMe(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async isVerified(id: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) return false;
    return user.verified;
  }
}
