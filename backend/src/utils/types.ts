export type JwtPayload = {
  sub: string;
  email: string;
  is_2fa_enabled: boolean;
  is_2fa_verified: boolean;
};

export type MemberStatus = 'banned' | 'muted';

export type ChannelRole = 'owner' | 'admin' | 'member';

export type ChannelType = 'public' | 'private';

export type CreateChannelArgs = {
  name: string;
  type: ChannelType;
  password?: string;
  avatar?: Express.Multer.File;
  banner?: Express.Multer.File;
};

export type ImagesFiles = Partial<{
  avatar: Express.Multer.File[];
  banner: Express.Multer.File[];
}>;
