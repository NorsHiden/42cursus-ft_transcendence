import { MatchHistory } from 'src/typeorm/match_history.entity';
import { MatchHistoryDto } from '../dto/matchHistory.dto';
import { MatchHistoryData } from '../types/data.type';

export interface IMatchHistoryService {
  setMatch(match_history: MatchHistory): Promise<MatchHistory>;
  getUserLossMatches(user_id: string, page: number): Promise<MatchHistoryData>;
  getUserMatches(user_id: string, page: number): Promise<MatchHistoryData>;
  getUserWinMatches(user_id: string, page: number): Promise<MatchHistoryData>;
  getUserHighlightsMatches(user_id: string): Promise<MatchHistoryData>;
  addMatchHistory(match_history: MatchHistoryDto): Promise<MatchHistory>;
}
