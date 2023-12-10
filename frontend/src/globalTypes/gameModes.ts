import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';

export enum GAMEMODE_NAME {
  REGULAR = 'REGULAR',
  CURSED = 'CURSED',
  VANISH = 'VANISH',
  GOLD_RUSH = 'GOLD_RUSH',
}

export const GAME_MODES = {
  [GAMEMODE_NAME.REGULAR]: { name: 'regular', icon: RegularIcon },
  [GAMEMODE_NAME.CURSED]: { name: 'cursed', icon: CursedIcon },
  [GAMEMODE_NAME.VANISH]: { name: 'vanish', icon: VanishIcon },
  [GAMEMODE_NAME.GOLD_RUSH]: { name: 'goldRush', icon: GoldRushIcon },
};
