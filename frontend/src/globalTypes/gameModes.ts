import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';

export enum GameModesType {
  REGULAR = 'REGULAR',
  CURSED = 'CURSED',
  VANISH = 'VANISH',
  GOLD_RUSH = 'GOLD_RUSH',
}

export const GAME_MODES = [
  { name: 'regular', icon: RegularIcon },
  { name: 'cursed', icon: CursedIcon },
  { name: 'vanish', icon: VanishIcon },
  { name: 'goldRush', icon: GoldRushIcon },
];
