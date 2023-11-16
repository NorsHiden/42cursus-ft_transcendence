export enum Routes {
  CHAT = 'chat',
  AUTH = 'auth',
  USERS = 'users',
  ME = '@me',
  FRIENDLIST = 'friendlist',
  NOTIFICATION = 'notification',
  ACHIEVEMENT = 'Achievement',
  CHANNELS = 'channels',
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
  Game = 'GAME_SERVICE',
}

export enum Namespaces {
  Chat = '/chat',
  Game = '/game',
}

export const imagesFileFields = [
  { name: 'avatar', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
];
