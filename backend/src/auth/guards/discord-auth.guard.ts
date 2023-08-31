import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class DiscordOAuthGuard extends AuthGuard('discord') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    return {
      state: `${context.switchToHttp().getRequest().query.redirect || '/'}`,
    };
  }
}
