import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'src/typeorm/match_history.entity';
import { Repository } from 'typeorm';
import { MatchHistoryDto } from '../dto/matchHistory.dto';
import { User } from 'src/typeorm/user.entity';
import { MatchHistoryData } from '../types/data.type';

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
  ) {}

  async getMatches(
    page: number,
    limit: number,
    game_mode: string,
  ): Promise<MatchHistory[]> {
    if (!page) page = 0;
    if (!limit) limit = 10;
    const matches = await this.matchHistoryRepository.find({
      where: game_mode === 'ALL' ? {} : { game_mode },
      relations: [
        'home_player',
        'away_player',
        'home_player.profile',
        'away_player.profile',
      ],
      order: {
        created_at: 'DESC',
      },
    });
    return matches.slice(page * limit, page * limit + limit);
  }

  async getUserMatches(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<MatchHistoryData> {
    if (!page) page = 0;
    if (!limit) limit = 10;
    const matches = await this.matchHistoryRepository.find({
      where: [
        { home_player: { id: user_id } },
        { away_player: { id: user_id } },
      ],
      relations: [
        'home_player',
        'away_player',
        'home_player.profile',
        'away_player.profile',
      ],
      order: {
        created_at: 'DESC',
      },
    });
    const matchesNeeded = matches.slice(page * limit, page * limit + limit);
    return {
      data: matchesNeeded,
      meta: {
        itemsPerPage: limit,
        totalItems: matchesNeeded.length,
        currentPage: page,
        TotalPages: Math.ceil(matches.length / limit),
        sortBy: { field: 'created_at', order: 'DESC' },
      },
    };
  }

  async getUserWinMatches(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<MatchHistoryData> {
    if (!page) page = 0;
    if (!limit) limit = 10;
    const matches = await this.matchHistoryRepository.find({
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
      relations: [
        'home_player',
        'away_player',
        'home_player.profile',
        'away_player.profile',
      ],
      order: {
        created_at: 'DESC',
      },
    });
    const matchesNeeded = matches.slice(page * limit, page * limit + limit);
    return {
      data: matchesNeeded,
      meta: {
        itemsPerPage: limit,
        totalItems: matchesNeeded.length,
        currentPage: page,
        TotalPages: Math.ceil(matches.length / limit),
        sortBy: { field: 'created_at', order: 'DESC' },
      },
    };
  }

  async getUserHighlightsMatches(user_id: string): Promise<MatchHistoryData> {
    const matches = await this.matchHistoryRepository.find({
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
      relations: [
        'home_player',
        'away_player',
        'home_player.profile',
        'away_player.profile',
      ],
      order: {
        win_gap: 'DESC',
        created_at: 'DESC',
      },
      take: 6,
    });
    return {
      data: matches,
      meta: {
        itemsPerPage: 6,
        totalItems: matches.length,
        currentPage: 0,
        TotalPages: 1,
        sortBy: { field: 'created_at', order: 'DESC' },
      },
    };
  }

  async getUserLossMatches(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<MatchHistoryData> {
    if (!page) page = 0;
    if (!limit) limit = 10;
    const matches = await this.matchHistoryRepository.find({
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
    });
    const matchesNeeded = matches.slice(page * limit, page * limit + limit);
    return {
      data: matchesNeeded,
      meta: {
        itemsPerPage: limit,
        totalItems: matchesNeeded.length,
        currentPage: page,
        TotalPages: Math.ceil(matches.length / limit),
        sortBy: { field: 'created_at', order: 'DESC' },
      },
    };
  }

  async setMatch(match_history: MatchHistory): Promise<MatchHistory> {
    return this.matchHistoryRepository.save(match_history);
  }

  async addMatchHistory(match_history: MatchHistoryDto): Promise<MatchHistory> {
    const match_history_entity = new MatchHistory();
    match_history_entity.game_mode = match_history.game_mode;
    match_history_entity.home_player = { id: match_history.home_id } as User;
    match_history_entity.away_player = { id: match_history.away_id } as User;
    match_history_entity.home_score = match_history.home_score;
    match_history_entity.away_score = match_history.away_score;
    match_history_entity.win_gap = Math.abs(
      match_history.home_score - match_history.away_score,
    );
    match_history_entity.created_at = new Date();
    match_history_entity.ended_at = new Date();
    return await this.matchHistoryRepository.save(match_history_entity);
  }
}
