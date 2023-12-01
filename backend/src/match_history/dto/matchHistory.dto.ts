import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class MatchHistoryDto {
  @IsString()
  @IsNotEmpty()
  game_mode: string;

  @IsString()
  @IsNotEmpty()
  home_id: string;

  @IsString()
  @IsNotEmpty()
  away_id: string;

  @IsNumber()
  @IsNotEmpty()
  home_score: number;

  @IsNumber()
  @IsNotEmpty()
  away_score: number;
}
