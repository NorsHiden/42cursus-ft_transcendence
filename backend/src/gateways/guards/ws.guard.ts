import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getClient().handshake;
    const cookies = request.headers.cookie;

    if (!cookies) throw new WsException('Please log in to continue');

    const token = cookies
      .split(';')
      .find((cookie: string) => cookie.startsWith('access_token'))
      .split('=')[1];

    if (!token) throw new WsException('Please log in to continue');

    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new WsException('Please log in to continue');
    }
    return true;
  }
}
