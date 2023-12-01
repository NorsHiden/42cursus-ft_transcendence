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
  verified: boolean;
  profile: UserProfile;
};

export type UserChannel = {
  id: 46;
  role: string;
  state: string;
  user: {
    id: number;
    username: string;
    display_name: string;
    presence: 'offline' | 'online' | 'ingame';
    profile: {
      avatar: string;
    };
  };
};
