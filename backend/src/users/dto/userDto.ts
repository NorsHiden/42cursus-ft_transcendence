import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  @Length(3, 10, { message: 'Username must be between 3 and 10 characters' })
  readonly username?: string;

  @IsString()
  @IsOptional()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  readonly display_name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly about?: string;

  @IsUrl()
  @IsOptional()
  readonly avatar_url?: string;
}
