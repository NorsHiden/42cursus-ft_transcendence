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

  async saveUserData(
    id: string,
    username: string,
    display_name: string,
    avatar_url: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) return null;
    user.username = username;
    user.display_name = display_name;
    user.avatar_url = avatar_url;
    user.verified = true;
    return await this.userRepository.save(user);
  }
}
