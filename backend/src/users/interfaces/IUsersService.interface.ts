import { User } from 'src/typeorm/user.entity';
import { UserDto } from '../dto/userDto';

/**
 * @description Service for User
 * @export
 * @interface IUserService
 * @example import { User } from 'src/typeorm/user.entity';
 */
export interface IUsersService {
  getMe(id: string): Promise<User>;
  getUser(id: string);
  getFriendList(user_id: string, notification?: boolean);
  search(search_query: string);
  findUserByEmail(email: string): Promise<User>;
  createUser(user: UserDto): Promise<User>;
  saveUser(user: User): Promise<User>;
  isVerified(
    email: string,
  ): Promise<{ statusCode: number; is_verified: boolean }>;
  completeLogin(
    id: string,
    username: string,
    display_name: string,
    profileImageUrl: string,
  ): Promise<User>;
  updateAbout(id: string, about: string): Promise<User>;
}
