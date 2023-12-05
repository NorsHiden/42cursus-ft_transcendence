import CircleOfAllies from '@assets/achievementsIcons/CircleOfAllies';
import DmInitiator from '@assets/achievementsIcons/DmInitiator';
import GameOn from '@assets/achievementsIcons/GameOn';
import GroupChatStarter from '@assets/achievementsIcons/GroupChatStarter';
import PongMaster from '@assets/achievementsIcons/PongMaster';
import QuickStarter from '@assets/achievementsIcons/QuickStarter';
import SocialButterfly from '@assets/achievementsIcons/SocialButterfly';
import UnbeatableDefender from '@assets/achievementsIcons/UnbeatableDefender';
import VictoryLap from '@assets/achievementsIcons/VictoryLap';
import WelcomeAboard from '@assets/achievementsIcons/WelcomeAboard';

export enum AchievementType {
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

export const achievements = {
  [AchievementType.WELCOME_ABOARD]: { icon: WelcomeAboard, color: '#6B26FF' },
  [AchievementType.SOCIAL_PIONEER]: { icon: SocialButterfly, color: '#6B26FF' },
  [AchievementType.CIRCLE_OF_ALLIES]: { icon: CircleOfAllies, color: '#D5FF5C' },
  [AchievementType.DM_INITIATOR]: { icon: DmInitiator, color: '#FF2695' },
  [AchievementType.QUICK_STARTER]: { icon: QuickStarter, color: '#57B4DA' },
  [AchievementType.GROUP_CHAT_STARTER]: { icon: GroupChatStarter, color: '#FE5821' },
  [AchievementType.SOCIAL_BUTTERFLY]: { icon: SocialButterfly, color: '#FF2695' },
  [AchievementType.GAME_ON]: { icon: GameOn, color: '#D5FF5C' },
  [AchievementType.VICTORY_LAP]: { icon: VictoryLap, color: '#6B26FF' },
  [AchievementType.UNBEATABLE_DEFENDER]: { icon: UnbeatableDefender, color: '#57B4DA' },
  [AchievementType.PONG_MASTER]: { icon: PongMaster, color: '#FE5821' },
};
