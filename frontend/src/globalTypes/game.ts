import { GameModesType } from './gameModes';

export type Player = {
  x: number;
  y: number;
  width: number;
  height: number;
  display_name: string;
  avatar: string;
  is_ready: boolean;
};

export type Ball = {
  x: number;
  y: number;
  is_hidden: boolean;
  speed: { dx: number; dy: number };
  radius: number;
};

export type GameData = {
  home: Player;
  away: Player;
  ball: Ball;
  score: { home: number; away: number };
  mode: GameModesType;
  will_reverse: boolean;
  ready_timer: number;
  is_finished: boolean;
  alpha: number;
};
