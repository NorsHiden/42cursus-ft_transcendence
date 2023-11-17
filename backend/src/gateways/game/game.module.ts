import { Module } from '@nestjs/common';
import { Services } from 'src/utils/consts';
<<<<<<< HEAD
<<<<<<< HEAD
import { JwtService } from '@nestjs/jwt';
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';
import { GatewaysService } from '../services/gateways.service';
<<<<<<< HEAD
import { UsersModule } from 'src/users/users.module';
import { NotificationModule } from 'src/notification/notification.module';
import { MatchHistoryModule } from 'src/match_history/match_history.module';
import { AchievementModule } from 'src/achievement/achievement.module';

@Module({
  imports: [
    UsersModule,
    NotificationModule,
    MatchHistoryModule,
    AchievementModule,
  ],
=======
=======
import { JwtService } from '@nestjs/jwt';
>>>>>>> 26804f8 (jwtService added)
import { GameService } from './services/game.service';
import { GameGateway } from './gateway/game.gateway';
=======
>>>>>>> eeab70f (joining rooms)

@Module({
  imports: [],
>>>>>>> ccf63eb (game init)
  providers: [
    {
      provide: Services.Game,
      useClass: GameService,
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eeab70f (joining rooms)
    {
      provide: Services.Gateways,
      useClass: GatewaysService,
    },
    JwtService,
=======
>>>>>>> ccf63eb (game init)
=======
    JwtService,
>>>>>>> 26804f8 (jwtService added)
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
