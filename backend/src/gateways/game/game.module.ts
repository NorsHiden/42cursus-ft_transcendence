import { Module } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { JwtService } from '@nestjs/jwt';
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';

@Module({
  imports: [],
  providers: [
    {
      provide: Services.Game,
      useClass: GameService,
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
