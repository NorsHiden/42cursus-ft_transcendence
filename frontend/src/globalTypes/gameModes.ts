import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';

export enum GameModesType {
  REGULAR = 'REGULAR',
  CURSED = 'CURSED',
  VANISH = 'VANISH',
  GOLD_RUSH = 'GOLD_RUSH',
}

export const GAME_MODES = {
  [GameModesType.REGULAR]: { name: 'regular', icon: RegularIcon },
  [GameModesType.CURSED]: { name: 'cursed', icon: CursedIcon },
  [GameModesType.VANISH]: { name: 'vanish', icon: VanishIcon },
  [GameModesType.GOLD_RUSH]: { name: 'goldRush', icon: GoldRushIcon },
};
