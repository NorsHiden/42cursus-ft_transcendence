export type RecentGame = {
  isLive: boolean;
  gamemode: 'REGULAR' | 'CURSED' | 'VANISH' | 'GOLD_RUSH';
  time: string;
  host: {
    id: string;
    username: string;
    score: number;
    avatar: string;
  };
  opponent: {
    id: string;
    username: string;
    score: number;
    avatar: string;
  };
};
