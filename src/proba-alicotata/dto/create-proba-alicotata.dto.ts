import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProbaAlicotataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rand: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  coloana: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  statutul_probei: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tip_pastrare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zona_pastrare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cutie_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  frigider_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  proba_id: string;
}
