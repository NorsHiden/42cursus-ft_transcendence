export enum Routes {
  CHAT = 'chat',
  AUTH = 'auth',
  USERS = 'users',
  ME = '@me',
  FRIENDLIST = 'friendlist',
  NOTIFICATION = 'notification',
  ACHIEVEMENT = 'Achievement',
  CHANNELS = 'channels',
  MEMBERS = 'channels/:id/members',
  MATCH_HISTORY = 'match_history',
}

export enum Services {
  Auth = 'AUTH_SERVICE',
  Users = 'USERS_SERVICE',
  Friendlist = 'FRIENDLIST_SERVICE',
  Notification = 'NOTIFICATION_SERVICE',
  Achievement = 'ACHIEVEMENT_SERVICE',
  Gateways = 'GATEWAYS_SERVICE',
  Chat = 'CHAT_SERVICE',
  Channels = 'CHANNELS_SERVICE',
  Members = 'MEMBERS_SERVICE',
  Game = 'GAME_SERVICE',
  MatchHistory = 'MATCH_HISTORY',
}

export enum Namespaces {
  Chat = '/chat',
  Game = '/game',
}

export const imagesFileFields = [
  { name: 'avatar', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
];

export enum WebSocketEvents {
  Lobby = 'lobby',
  InGame = 'ingame',
  Spectators = 'spectators',
}

export const chatTimout = 1000 * 60; // 1 minute

export enum GameMode {
  REGULAR = 'REGULAR',
  CURSED = 'CURSED',
  VANISH = 'VANISH',
  GOLD_RUSH = 'GOLD_RUSH',
}
