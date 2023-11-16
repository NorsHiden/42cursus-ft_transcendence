import { ChannelType } from 'src/utils/types';
import { IsChannelType } from '../validators/channel-type.validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsChannelType()
  @IsString()
  type: ChannelType;

  @IsNotEmpty()
  @MaxLength(100)
  @IsStrongPassword()
  @IsOptional()
  password?: string;
}
