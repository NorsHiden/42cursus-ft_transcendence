import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

/**
 * Google OAuth Guard
 * @extends AuthGuard
 * @example @UseGuards(GoogleOAuthGuard)
 * @example @Get('google/login')
 * @example @Get('google/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  /**
   * @description Get authenticate options
   * @param {ExecutionContext} context
   * @returns {IAuthModuleOptions} Authenticate options
   * @example getAuthenticateOptions(context)
   * @example getAuthenticateOptions(context).state
   * @example getAuthenticateOptions(context).state = '/postlogin'
   */
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    return {
      state: `${context.switchToHttp().getRequest().query.redirect || '/'}`,
    };
  }
}
