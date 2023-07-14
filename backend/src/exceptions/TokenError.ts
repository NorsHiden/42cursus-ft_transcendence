import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenError } from 'passport-oauth2';

@Catch(TokenError)
export class TokenErrorFilter implements ExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 401;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
