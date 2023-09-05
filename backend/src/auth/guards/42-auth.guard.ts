import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

/**
 * 42 OAuth Guard
 * @extends AuthGuard
 * @example @UseGuards(FourtyTwoOAuthGuard)
 * @example @Get('42/login')
 * @example @Get('42/redirect')
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-strategies
 */
@Injectable()
export class FourtyTwoOAuthGuard extends AuthGuard('42') {
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
