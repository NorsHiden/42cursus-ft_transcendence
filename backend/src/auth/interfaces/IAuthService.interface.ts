import { User } from 'src/typeorm/User';

export interface IAuthService {
  signIn(user: User): Promise<string>;
  generateJwt(user: User): string;
  registerUser(user: User): Promise<string>;
  findUser(id: string): Promise<User>;
  isVerified(id: string): Promise<{ statusCode: number; is_verified: boolean }>;
}
