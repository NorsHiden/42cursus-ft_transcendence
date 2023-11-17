import { Module } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { JwtService } from '@nestjs/jwt';
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';
import { GatewaysService } from '../services/gateways.service';

@Module({
  imports: [],
  providers: [
    {
      provide: Services.Game,
      useClass: GameService,
    },
    {
      provide: Services.Gateways,
      useClass: GatewaysService,
    },
    JwtService,
    GameGateway,
  ],
  exports: [
    {
      provide: Services.Game,
      useClass: GameService,
    },
  ],
})
export class GameModule {}
