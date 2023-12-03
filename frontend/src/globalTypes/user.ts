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
  points: number;
  presence?: 'online' | 'offline' | 'ingame';
  verified: boolean;
  profile: UserProfile;
};
