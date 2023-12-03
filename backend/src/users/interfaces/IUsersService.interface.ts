import { User } from 'src/typeorm/user.entity';
import { UserDto } from '../dto/userDto';
import { Response } from 'express';
import { JwtPayload } from 'src/utils/types';

/**
 * @description Service for User
 * @export
 * @interface IUserService
 * @example import { User } from 'src/typeorm/user.entity';
 */
export interface IUsersService {
  // get user without relations
  getUser(user_id: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  setUser(user: User): Promise<User>;
  createUser(user: UserDto): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  updateUser(
    user_id: string,
    userDto: UserDto,
    images: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ): Promise<User>;

  // get user with relations
  getNotifications(user_id: string): Promise<User>;
  getProfile(user_id: string): Promise<User>;
  getFriendList(user_id: string): Promise<User>;
  getFriends(user_id: string): Promise<User>;
  getPending(user_id: string): Promise<User>;
  getBlocked(user_id: string): Promise<User>;
  getAchievements(user_id: string): Promise<User>;
  getUsers(query: string): Promise<User[]>;
  setPresence(
    user_id: string,
    presence: 'online' | 'offline' | 'ingame',
  ): Promise<User>;

  // boolean
  isVerified(user_id: string): Promise<boolean>;
}
