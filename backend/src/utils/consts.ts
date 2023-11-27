export enum Routes {
  CHAT = 'chat',
  AUTH = 'auth',
  USERS = 'users',
  ME = '@me',
  FRIENDLIST = 'friendlist',
  NOTIFICATION = 'notification',
  ACHIEVEMENT = 'Achievement',
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
  Game = 'GAME_SERVICE',
  MatchHistory = 'MATCH_HISTORY',
}

export enum Namespaces {
  Chat = '/chat',
  Game = '/game',
}

export enum WebSocketEvents {
  Lobby = 'lobby',
  InGame = 'ingame',
  Spectators = 'spectators',
}
