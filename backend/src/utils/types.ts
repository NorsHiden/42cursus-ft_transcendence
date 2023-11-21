export type JwtPayload = {
  sub: string;
  email: string;
  is_2fa_enabled: boolean;
  is_2fa_verified: boolean;
};
