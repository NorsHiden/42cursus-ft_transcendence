export enum Routes {
  CHAT = 'chat',
  AUTH = 'auth',
  USERS = 'users',
  ME = '@me',
  FRIENDLIST = 'friendlist',
  NOTIFICATION = 'notification',
  ACHIEVEMENT = 'Achievement',
<<<<<<< HEAD
  CHANNELS = 'channels',
=======
>>>>>>> f2aee2a (match history has been added)
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
<<<<<<< HEAD
  Channels = 'CHANNELS_SERVICE',
  Game = 'GAME_SERVICE',
  MatchHistory = 'MATCH_HISTORY',
<<<<<<< HEAD
=======
  Game = 'GAME_SERVICE',
>>>>>>> ccf63eb (game init)
=======
>>>>>>> f2aee2a (match history has been added)
}

export enum Namespaces {
  Chat = '/chat',
  Game = '/game',
<<<<<<< HEAD
}

export const imagesFileFields = [
  { name: 'avatar', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
];
export enum WebSocketEvents {
  Lobby = 'lobby',
  InGame = 'ingame',
  Spectators = 'spectators',
=======
>>>>>>> ccf63eb (game init)
}

export enum WebSocketEvents {
  Lobby = 'lobby',
  InGame = 'ingame',
  Spectators = 'spectators',
}
