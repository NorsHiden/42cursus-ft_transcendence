import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/profile.entity';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/userDto';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { match } from 'fuzzy-tools';
import { Friendlist } from 'src/typeorm/friendlist.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // async onApplicationBootstrap() {
  //   const usersTestData = [
  //     {
  //       username: 'john_doe',
  //       display_name: 'John Doe',
  //       email: 'john.doe@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Software Engineer at ABC Tech',
  //         avatar: 'https://i.pravatar.cc/300?u=1',
  //         banner: 'https://example.com/john_doe-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'jane_smith',
  //       display_name: 'Jane Smith',
  //       email: 'jane.smith@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Product Manager at XYZ Corp',
  //         avatar: 'https://i.pravatar.cc/300?u=2',
  //         banner: 'https://example.com/jane_smith-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'mike_jackson',
  //       display_name: 'Mike Jackson',
  //       email: 'mike.jackson@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Digital Marketing Specialist',
  //         avatar: 'https://i.pravatar.cc/300?u=3',
  //         banner: 'https://example.com/mike_jackson-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'sarah_adams',
  //       display_name: 'Sarah Adams',
  //       email: 'sarah.adams@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Travel Enthusiast and Blogger',
  //         avatar: 'https://i.pravatar.cc/300?u=4',
  //         banner: 'https://example.com/sarah_adams-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'david_clark',
  //       display_name: 'David Clark',
  //       email: 'david.clark@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Web Developer and Designer',
  //         avatar: 'https://i.pravatar.cc/300?u=5',
  //         banner: 'https://example.com/david_clark-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'emily_martin',
  //       display_name: 'Emily Martin',
  //       email: 'emily.martin@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Graphic Designer and Illustrator',
  //         avatar: 'https://i.pravatar.cc/300?u=6',
  //         banner: 'https://example.com/emily_martin-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'robert_brown',
  //       display_name: 'Robert Brown',
  //       email: 'robert.brown@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Entrepreneur and Investor',
  //         avatar: 'https://i.pravatar.cc/300?u=7',
  //         banner: 'https://example.com/robert_brown-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'olivia_wilson',
  //       display_name: 'Olivia Wilson',
  //       email: 'olivia.wilson@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Fashion Blogger and Stylist',
  //         avatar: 'https://i.pravatar.cc/300?u=8',
  //         banner: 'https://example.com/olivia_wilson-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'william_harris',
  //       display_name: 'William Harris',
  //       email: 'william.harris@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Photographer and Nature Lover',
  //         avatar: 'https://i.pravatar.cc/300?u=9',
  //         banner: 'https://example.com/william_harris-banner.jpg',
  //       },
  //     },
  //     {
  //       username: 'lisa_smith',
  //       display_name: 'Lisa Smith',
  //       email: 'lisa.smith@example.com',
  //       verified: true,
  //       profile: {
  //         about: 'Foodie and Recipe Enthusiast',
  //         avatar: 'https://i.pravatar.cc/300?u=10',
  //         banner: 'https://example.com/lisa_smith-banner.jpg',
  //       },
  //     },
  //   ];

  //   usersTestData.forEach(async (user) => await this.userRepository.save(user));
  // }

  async getMe(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        profile: true,
        friendlist: true,
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

  async getNotifications(id: string): Promise<User> {
    const userNotifications = await this.userRepository.findOne({
      where: {
        id: id,
        verified: true,
      },
      select: ['id', 'notifications'],
      relations: ['notifications'],
    });
    if (!userNotifications) throw new NotFoundException('user not found');
    return userNotifications;
  }

  async getFriendList(id: string): Promise<User> {
    const userFriendlist = await this.userRepository.findOne({
      where: {
        id: id,
        verified: true,
      },
      select: ['id', 'friendlist'],
      relations: [
        'friendlist.friends',
        'friendlist.pending',
        'friendlist.blocked',
        'friendlist.friends.profile',
        'friendlist.pending.profile',
        'friendlist.blocked.profile',
      ],
    });
    if (!userFriendlist) throw new NotFoundException('user not found');
    return userFriendlist;
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
    newProfile.avatar = user.profile.avatar;
    const newUser = this.userRepository.create({
      email: user.email,
      profile: newProfile,
      friendlist: new Friendlist(),
    });
    return await this.userRepository.save(newUser);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
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
