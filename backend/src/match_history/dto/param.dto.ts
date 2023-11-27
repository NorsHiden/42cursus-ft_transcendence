import { IsNotEmpty, IsNumberString } from 'class-validator';

export class paramDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
