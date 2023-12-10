import { GAMEMODE_NAME } from './gameModes';

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
