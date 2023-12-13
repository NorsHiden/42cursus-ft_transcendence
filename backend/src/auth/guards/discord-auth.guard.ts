import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

/**
 * Discord OAuth Guard
 * @extends AuthGuard
 * @example @UseGuards(DiscordOAuthGuard)
 * @example @Get('discord/login')
 * @example @Get('discord/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
@Injectable()
export class DiscordOAuthGuard extends AuthGuard('discord') {
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
