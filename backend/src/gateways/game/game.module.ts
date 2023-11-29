import { Module } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { JwtService } from '@nestjs/jwt';
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';
import { GatewaysService } from '../services/gateways.service';
import { UsersModule } from 'src/users/users.module';
import { NotificationModule } from 'src/notification/notification.module';
import { MatchHistoryModule } from 'src/match_history/match_history.module';
import { AchievementModule } from 'src/achievement/achievement.module';
import { AllExceptionsFilter } from '../filters/exception.filter';

@Module({
  imports: [
    UsersModule,
    NotificationModule,
    MatchHistoryModule,
    AchievementModule,
  ],
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
