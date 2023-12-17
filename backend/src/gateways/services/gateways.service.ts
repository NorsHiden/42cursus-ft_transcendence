import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IGatwaysService } from '../interfaces/IGatwaysService.interface';
import { Socket } from 'socket.io';

@Injectable()
export class GatewaysService implements IGatwaysService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getUserId(client: Socket): Promise<number> {
    const cookies = client.handshake.headers.cookie;

    if (!cookies) {
      client.disconnect();
      return;
    }

    const token = cookies
      .split(';')
      .find((cookie: string) => cookie.startsWith('access_token'))
      ?.split('=')[1];

    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return payload.sub;
    } catch (error) {
      client.disconnect();
      return;
    }
  }
}
