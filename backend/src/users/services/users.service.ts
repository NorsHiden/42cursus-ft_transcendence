import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getMe(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        profile: true,
      },
    });
  }

  async isVerified(
    id: string,
  ): Promise<{ statusCode: number; is_verified: boolean }> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user)
      return {
        statusCode: 200,
        is_verified: false,
      };
    return {
      statusCode: 200,
      is_verified: user.verified,
    };
  }

  async completeLogin(
    id: string,
    username: string,
    display_name: string,
    avatar_url: string,
  ): Promise<User> {
    if (await this.userRepository.findOneBy({ username: username })) {
      // If the username already exists, throw an error.
      // This is to prevent users from taking usernames that already exist.
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          profile: true,
        },
      });
      if (!user) return null;
      user.display_name = display_name;
      if (avatar_url) user.profile.avatar = avatar_url;
      await this.userRepository.save(user);
      throw new ForbiddenException('username already exists');
    }
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        profile: true,
      },
    });
    if (!user) return null;
    user.username = username;
    user.display_name = display_name;
    if (avatar_url) user.profile.avatar = avatar_url;
    user.verified = true;
    return await this.userRepository.save(user);
  }

  async updateAbout(id: string, about: string): Promise<User> {
    const user = await this.getMe(id);
    if (!user) return null;
    if (!user.verified) throw new ForbiddenException("user isn't verified");
    user.profile.about = about;
    return await this.userRepository.save(user);
  }
}
