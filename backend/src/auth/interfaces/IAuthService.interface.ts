import { User } from 'src/typeorm/user.entity';
import { Response } from 'express';

/**
 * @description Interface for AuthService
 * @interface
 * @name IAuthService
 * @example
 * import { User } from 'src/typeorm/user.entity';
 */
export interface IAuthService {
  signIn(req, res: Response, state: string): Promise<{ url: string }>;
  generateJwt(user: User): string;
  isVerified(id: string): Promise<{ statusCode: number; is_verified: boolean }>;
}
