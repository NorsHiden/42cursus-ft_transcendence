import {
  IsDateString,
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  @IsLowercase()
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain letters, numbers, underscores, and hyphens',
  })
  @Length(3, 10, { message: 'Username must be between 3 and 10 characters' })
  readonly username?: string;

  @IsString()
  @IsOptional()
  @Length(3, 20, {
    message: 'Display Name must be between 3 and 20 characters',
  })
  readonly display_name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @Length(0, 300, {
    message: 'Bio must be less than 300 characters',
  })
  readonly about?: string;

  @IsString()
  @IsOptional()
  readonly location?: string;

  @IsDateString()
  @IsOptional()
  readonly birthdate?: string;

  @IsUrl()
  @IsOptional()
  readonly avatar_url?: string;
}
