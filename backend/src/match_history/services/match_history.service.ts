import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'src/typeorm/match_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
  ) {}

  async getUserMatches(
    user_id: string,
    page: number = 0,
  ): Promise<MatchHistory[]> {
    return await this.matchHistoryRepository.find({
      where: [
        { home_player: { id: user_id } },
        { away_player: { id: user_id } },
      ],
      relations: ['home_player', 'away_player'],
      order: {
        created_at: 'DESC',
      },
      take: 10,
      skip: page ? page * 10 : 0,
    });
  }

  async getUserWinMatches(
    user_id: string,
    page: number,
  ): Promise<MatchHistory[]> {
    return await this.matchHistoryRepository.find({
      where: [
        {
          home_player: {
            id: user_id,
          },
          home_score: 5,
        },
        {
          away_player: {
            id: user_id,
          },
          away_score: 5,
        },
      ],
      relations: ['away_player', 'home_player'],
      order: {
        created_at: 'DESC',
      },
      take: 10,
      skip: page ? page * 10 : 0,
    });
  }

  async getUserHighlightsMatches(
    user_id: string,
    page: number,
  ): Promise<MatchHistory[]> {
    return await this.matchHistoryRepository.find({
      where: [
        {
          home_player: {
            id: user_id,
          },
          home_score: 5,
        },
        {
          away_player: {
            id: user_id,
          },
          away_score: 5,
        },
      ],
      relations: ['away_player', 'home_player'],
      order: {
        win_gap: 'DESC',
        created_at: 'DESC',
      },
      take: 6,
    });
  }

  async getUserLossMatches(
    user_id: string,
    page: number,
  ): Promise<MatchHistory[]> {
    return await this.matchHistoryRepository.find({
      where: [
        {
          home_player: {
            id: user_id,
          },
          away_score: 5,
        },
        {
          away_player: {
            id: user_id,
          },
          home_score: 5,
        },
      ],
      relations: [
        'away_player',
        'home_player',
        'away_player.profile',
        'home_player.profile',
      ],
      order: {
        created_at: 'DESC',
      },
      take: 10,
      skip: page ? page * 10 : 0,
    });
  }

  async setMatch(match_history: MatchHistory): Promise<MatchHistory> {
    return this.matchHistoryRepository.save(match_history);
  }
}
