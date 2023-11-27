import { MatchHistory } from 'src/typeorm/match_history.entity';

export interface IMatchHistoryService {
  setMatch(match_history: MatchHistory): Promise<MatchHistory>;
  getUserLossMatches(user_id: string, page: number): Promise<MatchHistory[]>;
  getUserMatches(user_id: string, page: number): Promise<MatchHistory[]>;
  getUserWinMatches(user_id: string, page: number): Promise<MatchHistory[]>;
}
