import CircleOfAllies from '@assets/achievementsIcons/CircleOfAllies';
import DmInitiator from '@assets/achievementsIcons/DmInitiator';
import GameOn from '@assets/achievementsIcons/GameOn';
import GroupChatStarter from '@assets/achievementsIcons/GroupChatStarter';
import PongMaster from '@assets/achievementsIcons/PongMaster';
import QuickStarter from '@assets/achievementsIcons/QuickStarter';
import SocialButterfly from '@assets/achievementsIcons/SocialButterfly';
import SocialPioneer from '@assets/achievementsIcons/SocialPioneer';
import UnbeatableDefender from '@assets/achievementsIcons/UnbeatableDefender';
import VictoryLap from '@assets/achievementsIcons/VictoryLap';
import WelcomeAboard from '@assets/achievementsIcons/WelcomeAboard';

export type AchievementType = {
  id: number;
  name: string;
  alt_name: string;
  icon: string;
  description: string;
  isClaimed: boolean;
};

export enum ACHIEVEMENT_NAME {
  WELCOME_ABOARD = 'WELCOME_ABOARD',
  SOCIAL_PIONEER = 'SOCIAL_PIONEER',
  CIRCLE_OF_ALLIES = 'CIRCLE_OF_ALLIES',
  DM_INITIATOR = 'DM_INITIATOR',
  QUICK_STARTER = 'QUICK_STARTER',
  GROUP_CHAT_STARTER = 'GROUP_CHAT_STARTER',
  SOCIAL_BUTTERFLY = 'SOCIAL_BUTTERFLY',
  GAME_ON = 'GAME_ON',
  VICTORY_LAP = 'VICTORY_LAP',
  UNBEATABLE_DEFENDER = 'UNBEATABLE_DEFENDER',
  PONG_MASTER = 'PONG_MASTER',
}

export const ACHIEVEMENT_STYLES = {
  [ACHIEVEMENT_NAME.WELCOME_ABOARD]: { icon: WelcomeAboard, color: '#6B26FF' },
  [ACHIEVEMENT_NAME.SOCIAL_PIONEER]: { icon: SocialPioneer, color: '#6B26FF' },
  [ACHIEVEMENT_NAME.CIRCLE_OF_ALLIES]: { icon: CircleOfAllies, color: '#D5FF5C' },
  [ACHIEVEMENT_NAME.DM_INITIATOR]: { icon: DmInitiator, color: '#FF2695' },
  [ACHIEVEMENT_NAME.QUICK_STARTER]: { icon: QuickStarter, color: '#57B4DA' },
  [ACHIEVEMENT_NAME.GROUP_CHAT_STARTER]: { icon: GroupChatStarter, color: '#FE5821' },
  [ACHIEVEMENT_NAME.SOCIAL_BUTTERFLY]: { icon: SocialButterfly, color: '#FF2695' },
  [ACHIEVEMENT_NAME.GAME_ON]: { icon: GameOn, color: '#D5FF5C' },
  [ACHIEVEMENT_NAME.VICTORY_LAP]: { icon: VictoryLap, color: '#6B26FF' },
  [ACHIEVEMENT_NAME.UNBEATABLE_DEFENDER]: { icon: UnbeatableDefender, color: '#57B4DA' },
  [ACHIEVEMENT_NAME.PONG_MASTER]: { icon: PongMaster, color: '#FE5821' },
};
