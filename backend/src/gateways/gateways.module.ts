import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { GatewaysService } from './services/gateways.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/consts';
import { GameModule } from './game/game.module';

@Module({
  imports: [ChatModule, GameModule],
  providers: [
    {
      provide: Services.Gateways,
      useClass: GatewaysService,
    },
    JwtService,
    ConfigService,
  ],
  exports: [
    {
      provide: Services.Gateways,
      useClass: GatewaysService,
    },
  ],
})
export class GatewaysModule {}
