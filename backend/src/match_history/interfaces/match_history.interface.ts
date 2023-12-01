import { MatchHistory } from 'src/typeorm/match_history.entity';
import { MatchHistoryDto } from '../dto/matchHistory.dto';

export interface IMatchHistoryService {
  setMatch(match_history: MatchHistory): Promise<MatchHistory>;
  getUserLossMatches(user_id: string, page: number): Promise<MatchHistory[]>;
  getUserMatches(user_id: string, page: number): Promise<MatchHistory[]>;
  getUserWinMatches(user_id: string, page: number): Promise<MatchHistory[]>;
  getUserHighlightsMatches(
    user_id: string,
    page: number,
  ): Promise<MatchHistory[]>;
  ddMatchHistory(match_history: MatchHistoryDto): Promise<MatchHistory>;
}
