import { Game, match } from '@globalTypes/index';
import axios from 'axios';

export const fetchMatches = async (
  matchType: string,
  page: number,
  userId: number,
  setMatches: (value: match[]) => void,
  setHasMore: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  prevMatches: match[],
): Promise<void> => {
  setLoading(true);
  const matchTypePath = matchType !== 'all' ? `${matchType}` : '';
  const url = `/api/match_history/${userId}/${matchTypePath}?page=${page}`;
  console.log(url);
  try {
    const res = await axios.get(url);

    if (res.data.meta.currentPage < res.data.meta.TotalPages) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    const newMatches: match[] = res.data.data.map((match: any) => ({
      id: match.id,
      game_mode: match.game_mode as Game,
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
    }));
    setMatches([...prevMatches, ...newMatches]);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
