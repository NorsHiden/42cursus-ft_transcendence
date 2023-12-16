import axios from 'axios';

import { MatchType } from '@globalTypes/types';
import { GAMEMODE_NAME } from '@globalTypes/gameModes';

export const extractMatchType = (match: any): MatchType => {
  return {
    match_id: match.id,
    game_mode: match.game_mode as GAMEMODE_NAME,
    home_player: {
      id: match.home_player.id,
      username: match.home_player.username,
      score: match.home_score,
      avatar: match.home_player.profile.avatar,
    },
    away_player: {
      id: match.away_player.id,
      username: match.away_player.username,
      score: match.away_score,
      avatar: match.away_player.profile.avatar,
    },
    created_at: new Date(match.created_at),
    ended_at: new Date(match.ended_at),
  };
};

export const fetchMatches = async (
  matchType: string,
  page: number,
  userId: number,
  setMatches: React.Dispatch<React.SetStateAction<MatchType[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);
  const matchTypePath = matchType !== 'all' ? `${matchType}` : '';
  const url = `/api/match_history/${userId}/${matchTypePath}?page=${page}`;

  try {
    const res = await axios.get(url);

    setHasMore(res.data.meta.currentPage < res.data.meta.TotalPages);

    const newMatches: MatchType[] = res.data.data.map((match: any) => extractMatchType(match));

    setMatches((prev) => [...prev, ...newMatches]);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
