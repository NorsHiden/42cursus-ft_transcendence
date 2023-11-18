import { LobbyUser } from './LobbyUser.interface';

export interface InGame {
  id: string;
  home_player: LobbyUser;
  away_player: LobbyUser;
  spectators: {
    id: string;
  }[];
  game_mode: string;
  created_at: Date;
  end_at: Date;
}
