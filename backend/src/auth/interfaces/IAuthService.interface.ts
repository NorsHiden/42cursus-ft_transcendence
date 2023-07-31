import { User } from 'src/typeorm/User';

export interface IAuthService {
  signIn(user: User): Promise<string>;
  registerUser(user: User): Promise<string>;
  findUser(id: string): Promise<User>;
}
