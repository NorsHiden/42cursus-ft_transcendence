import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/profile.entity';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/userDto';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { match } from 'fuzzy-tools';

@Injectable()
export class UsersService implements IUsersService {
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

  async getUser(id: string) {
    return await this.userRepository.findOne({
      where: {
        id: id,
        verified: true,
      },
      select: ['id', 'display_name', 'username', 'profile'],
      relations: ['profile'],
    });
  }

  async search(search_query: string) {
    const allUsers = await this.userRepository.find({
      where: {
        verified: true,
      },
      select: ['id', 'display_name', 'username', 'profile'],
      relations: ['profile'],
    });
    return allUsers.filter((user) =>
      match(search_query, [user.username, user.display_name]),
    );
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
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        profile: true,
      },
    });
  }

  async createUser(user: UserDto): Promise<User> {
    const newProfile = new Profile();
    newProfile.about = 'I am a new user';
    newProfile.avatar = user.profile.avatar;
    newProfile.banner = '';
    const newUser = this.userRepository.create({
      username: null,
      display_name: null,
      email: user.email,
      verified: false,
      profile: newProfile,
    });
    return await this.userRepository.save(newUser);
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
