import { GameData } from './GameData.type';
import { LobbyUser } from './LobbyUser.type';

export type InGame = {
  id: string;
  home_player: LobbyUser;
  away_player: LobbyUser;
  spectators: {
    id: string;
    display_name: string;
    avatar: string;
  }[];
  count: number;
  round: number;
  is_reversed: boolean;
  game_data: GameData;
  game_mode: string;
  interval_id?: NodeJS.Timer;
  created_at: Date;
};
