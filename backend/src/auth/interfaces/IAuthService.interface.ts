import { User } from 'src/typeorm/user.entity';
import { Response } from 'express';
import { JwtPayload } from 'src/utils/types';

/**
 * @description Interface for AuthService
 * @interface
 * @name IAuthService
 * @example
 * import { User } from 'src/typeorm/user.entity';
 */
export interface IAuthService {
  signIn(req, res: Response, state: string): Promise<{ url: string }>;
  generateJwt(user: User, isverified: boolean): string;
  isVerified(id: string): Promise<{ statusCode: number; is_verified: boolean }>;
  generateTwoFactorAuthenticationSecret(user_id: string): Promise<string>;
  turnOnTwoFactorAuthentication(
    payload: JwtPayload,
    auth_code: string,
    res: Response,
  ): Promise<void>;
  turnOffTwoFactorAuthentication(user_id: string, res: Response): Promise<void>;
}
