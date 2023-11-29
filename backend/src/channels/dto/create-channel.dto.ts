import { ChannelType } from 'src/utils/types';
import { IsChannelType } from '../validators/channel-type.validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
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

  @ValidateIf((o) => o.type === 'public')
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  password?: string;
}
