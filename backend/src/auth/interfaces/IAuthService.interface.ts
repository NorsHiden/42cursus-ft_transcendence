import { User } from 'src/typeorm/user.entity';

/**
 * @description Interface for AuthService
 * @interface
 * @exports
 * @abstract
 * @name IAuthService
 * @extends {IAuthService}
 * @property {Promise<string>} signIn - Sign in user
 * @property {string} generateJwt - Generate JWT
 * @property {Promise<string>} registerUser - Register user
 * @property {Promise<User>} findUser - Find user
 * @property {Promise<{ statusCode: number; is_verified: boolean }>} isVerified - Check if user is verified
 * @example
 * import { User } from 'src/typeorm/user.entity';
 */
export interface IAuthService {
  signIn(user: User): Promise<string>;
  generateJwt(user: User): string;
  registerUser(user: User): Promise<string>;
  findUser(id: string): Promise<User>;
  isVerified(id: string): Promise<{ statusCode: number; is_verified: boolean }>;
}
