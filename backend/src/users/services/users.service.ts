import {
  BadRequestException,
  Inject,
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
import { Points } from 'src/typeorm/points.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Points)
    private readonly pointsRepository: Repository<Points>,
  ) {}

  // Method to retrieve user information by user ID.
  async getUser(user_id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: user_id,
        },
        relations: ['profile', 'points'],
        order: {
          points: {
            created_at: 'DESC',
          },
        },
      });
      if (!user) throw new NotFoundException('User Not Found.');
      return user;
    } catch {
      throw new NotFoundException('User Not Found.');
    }
  }

  async getPoints(user_id: string): Promise<object> {
    const points = await this.pointsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      order: {
        created_at: 'DESC',
      },
      take: 30,
    });

    const best_points = await this.pointsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      order: {
        value: 'DESC',
      },
      take: 2,
    });

    return {
      points: points,
      best_points: best_points,
    };
  }

  // Method to retrieve user information by user ID.
  async getUserByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
          verified: true,
        },
        relations: ['profile', 'points'],
      });
      if (!user) throw new NotFoundException('User Not Found.');
      return user;
    } catch {
      throw new NotFoundException('User Not Found.');
    }
  }

  // Method to set user information in the database.
  async setUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Method to retrieve user notifications by user ID.
  async getNotifications(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['notifications'],
      relations: [
        'notifications',
        'notifications.sender',
        'notifications.sender.profile',
        'notifications.recipient',
        'notifications.recipient.profile',
      ],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  // Method to retrieve user profile by user ID.
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

  // Method to retrieve user friend list by user ID.
  async getFriendList(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: [
        'profile',
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

  // Methods to retrieve specific lists from the user's friend list.
  async getFriends(user_id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :user_id', { user_id })
      .leftJoinAndSelect('user.friendlist', 'friendlist')
      .leftJoinAndSelect('friendlist.friends', 'friend')
      .leftJoinAndSelect('friend.profile', 'profile')
      .orderBy(
        'CASE WHEN friend.presence = :online THEN 1 WHEN friend.presence = :ingame THEN 2 ELSE 3 END',
        'ASC',
      )
      .setParameter('online', 'online')
      .setParameter('ingame', 'ingame')
      .getOne();
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  async getPending(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['friendlist'],
      relations: ['friendlist.pending', 'friendlist.pending.profile'],
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
      relations: ['friendlist.blocked', 'friendlist.blocked.profile'],
    });
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }

  // Method to retrieve user achievements by user ID.
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

  // Method to search for users based on a query string.
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

  // Method to find a user by their email.
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

  // Method to create a new user in the database.
  async createUser(user: UserDto): Promise<User> {
    const newProfile = new Profile();
    newProfile.avatar = user.avatar_url;
    const newUser = this.userRepository.create({
      email: user.email,
      profile: newProfile,
      friendlist: new Friendlist(),
      points: [new Points(), new Points()],
    });
    return await this.userRepository.save(newUser);
  }

  // Method to update user information in the database.
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
        throw new BadRequestException({
          message: ['Username Already exists'],
        });
    }
    const user = await this.getProfile(user_id);
    const updatedVersion: User = { ...user, ...userDto, email: user.email };
    if (images?.avatar) {
      const startIndex = images.avatar[0].path.indexOf('/imgs');
      updatedVersion.profile.avatar = images.avatar[0].path.slice(startIndex);
    }
    if (images?.banner) {
      const startIndex = images.banner[0].path.indexOf('/imgs');
      updatedVersion.profile.banner = images.banner[0].path.slice(startIndex);
    }
    updatedVersion.profile = {
      ...updatedVersion.profile,
      ...userDto,
    } as Profile;
    if (userDto.username && userDto.display_name)
      updatedVersion.verified = true;
    try {
      return await this.setUser(updatedVersion);
    } catch {
      updatedVersion.profile.birthdate = user.profile.birthdate;
      return await this.setUser(updatedVersion);
    }
  }

  async setPresence(
    user_id: string,
    presence: 'online' | 'offline' | 'ingame',
  ): Promise<User> {
    const user = await this.getUser(user_id);
    user.presence = presence;
    return await this.setUser(user);
  }

  async orderByWins(page: number): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        verified: true,
      },
      relations: ['profile'],
      order: {
        wins: 'DESC',
      },
      skip: page * 10,
      take: 10,
    });
    return users;
  }

  async isVerified(user_id: string): Promise<boolean> {
    const user = await this.getUser(user_id);
    return user.verified;
  }
}
