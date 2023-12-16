export type ProfileType = {
  id: number;
  about: string;
  avatar: string;
  banner: string;
};

export type UserType = {
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
  profile: ProfileType;
};

export type ChannelType = {
  role: string;
  state: string;
  userId: number;
  displayName: string;
  presence: string;
  avatar: string;
};
