import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { match } from 'fuzzy-tools';
import { UserDto } from '../dto/userDto';
import { Profile } from 'src/typeorm/profile.entity';
import { Friendlist } from 'src/typeorm/friendlist.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }
  async setUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getNotifications(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['notifications'],
      relations: ['notifications'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getProfile(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getFriendList(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: [
        'friendlist.friends',
        'friendlist.friends.profile',
        'friendlist.pending',
        'friendlist.pending.profile',
        'friendlist.blocked',
        'friendlist.blocked.profile',
      ],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getFriends(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: ['friendlist.friends'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getPending(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: ['friendlist.pending'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getBlocked(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: ['friendlist.blocked'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getAchievements(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['achievements'],
      relations: ['achievements'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getUsers(query: string): Promise<User[]> {
    const allUsers = await this.userRepository.find({
      where: {
        verified: true,
      },
      select: ['id', 'display_name', 'username', 'profile'],
      relations: ['profile'],
    });
    return allUsers.filter((user) =>
      match(query, [user.username, user.display_name]),
    );
  }

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
    newProfile.avatar = user.avatar_url;
    const newUser = this.userRepository.create({
      email: user.email,
      profile: newProfile,
      friendlist: new Friendlist(),
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    user_id: string,
    userDto: UserDto,
    images: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ): Promise<User> {
    if (userDto.username) {
      const otherUser = await this.userRepository.findOne({
        where: {
          username: userDto.username,
        },
      });
      if (otherUser && otherUser.id != user_id)
        throw new ForbiddenException('Username Already exists');
    }
    const user = await this.getProfile(user_id);
    const updatedVersion: User = { ...user, ...userDto, email: user.email };
    if (images.avatar)
      updatedVersion.profile.avatar = images.avatar[0].path.slice(7);
    if (images.banner)
      updatedVersion.profile.banner = images.banner[0].path.slice(7);
    if (userDto.about) updatedVersion.profile.about = userDto.about;
    if (userDto.username && userDto.display_name)
      updatedVersion.verified = true;
    return await this.setUser(updatedVersion);
  }

  async isVerified(user_id: string): Promise<boolean> {
    const user = await this.getUser(user_id);
    return user.verified;
  }
}
