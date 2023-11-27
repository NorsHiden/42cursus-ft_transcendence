import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistory } from 'src/typeorm/match_history.entity';
import { MatchHistoryController } from './controllers/match_history.controller';
import { Services } from 'src/utils/consts';
import { MatchHistoryService } from './services/match_history.service';
import { User } from 'src/typeorm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistory, User])],
  controllers: [MatchHistoryController],
  providers: [
    {
      provide: Services.MatchHistory,
      useClass: MatchHistoryService,
    },
  ],
  exports: [
    {
      provide: Services.MatchHistory,
      useClass: MatchHistoryService,
    },
  ],
})
export class MatchHistoryModule {}
