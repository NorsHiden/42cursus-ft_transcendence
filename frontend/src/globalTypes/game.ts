import { GAMEMODE_NAME } from './gameModes';
import { player } from './types';

export type PlayerType = {
  x: number;
  y: number;
  width: number;
  height: number;
  display_name: string;
  avatar: string;
  is_ready: boolean;
};

export type BallType = {
  x: number;
  y: number;
  is_hidden: boolean;
  speed: { dx: number; dy: number };
  radius: number;
};

export type GameData = {
  home: PlayerType;
  away: PlayerType;
  ball: BallType;
  score: { home: number; away: number };
  mode: GAMEMODE_NAME;
  will_reverse: boolean;
  ready_timer: number;
  is_finished: boolean;
  alpha: number;
};

export type LiveGameType = {
  isLive: boolean;
  game_id: string;
  gamemode: GAMEMODE_NAME;
  time: string;
  host: player;
  opponent: player;
  score: { host: number; opponent: number };
};

export type GameLobby = {
  state: string;
  game_id: string;
  message: string;
};
