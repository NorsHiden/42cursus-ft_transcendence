export type JwtPayload = {
  sub: string;
  username: string;
};

export type MemberStatus = 'banned' | 'muted';

export type ChannelRole = 'owner' | 'admin' | 'member';

export type ChannelType = 'public' | 'private';

export type CreateChannelArgs = {
  name: string;
  type: ChannelType;
  password?: string;
};
