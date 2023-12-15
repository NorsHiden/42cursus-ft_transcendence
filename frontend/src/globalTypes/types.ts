import { GAMEMODE_NAME } from './gameModes';

export type UserProfile = {
  id: number;
  about: string;
  avatar: string;
  banner: string;
  location: string;
  birthdate: Date;
};

export type User = {
  id: number;
  username: string;
  display_name: string;
  email: string;
  wins: number;
  loses: number;
  points: {
    value: number;
  }[];
  verified: boolean;
  profile: UserProfile;
  isForeign: boolean;
  friendStatus: string;
};

export type MatchType = {
  match_id: number;
  game_mode: GAMEMODE_NAME;
  home_player: player;
  away_player: player;
  created_at: Date;
  ended_at: Date;
};

export enum CardType {
  RECENT_MATCHES = 'recent_matches',
  MATCH_HISTORY = 'match_history',
}

export type player = {
  id: string;
  username: string;
  score: number;
  avatar: string;
};

export type Message = {
  id: string;
  content: string;
  author: {
    id: number;
    display_name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  messageReceivedSuccessfully: boolean;
};

export type Member = {
  role: string;
  state: string;
  userId: number;
  displayName: string;
  presence: string;
  avatar: string;
};

export type DM = {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
};
