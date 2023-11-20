import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data: unknown, ctx:ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const authenticatedUser = request.user;
  console.log(request.user)
  return authenticatedUser;
});
