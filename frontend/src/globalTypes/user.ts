export type UserProfile = {
  id: number;
  about: string;
  avatar: string;
  banner: string;
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
  presence: 'online' | 'ingame' | 'offline';
  verified: boolean;
  profile: UserProfile;
};

export type UserChannel = {
  role: string;
  state: string;
  userId: number;
  displayName: string;
  presence: string;
  avatar: string;
};
