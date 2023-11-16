import { Module } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';

@Module({
  imports: [],
  providers: [
    {
      provide: Services.Game,
      useClass: GameService,
    },
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
