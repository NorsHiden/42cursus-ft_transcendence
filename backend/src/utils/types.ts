export type JwtPayload = {
  sub: string;
  email: string;
  is_2fa_enabled: boolean;
  is_2fa_verified: boolean;
};

export type JwtUser = Partial<JwtPayload>;

export type MemberState = 'banned' | 'muted' | 'active';

export type ChannelRole = 'owner' | 'admin' | 'member';

export type ChannelType = 'public' | 'private' | 'dm';

export type NotificationStatus = 'pending' | 'accepted' | 'rejected';

export type CreateChannelDetails = {
  name: string;
  type: ChannelType;
  password?: string;
  avatar?: Express.Multer.File;
  banner?: Express.Multer.File;
};

export type CreateMessageDetails = {
  content: string;
};

export type UpdateChannelDetails = {
  name?: string;
  type?: ChannelType;
  password?: string;
  avatar?: Express.Multer.File;
  banner?: Express.Multer.File;
};

export type ImagesFiles = Partial<{
  avatar: Express.Multer.File[];
  banner: Express.Multer.File[];
}>;
