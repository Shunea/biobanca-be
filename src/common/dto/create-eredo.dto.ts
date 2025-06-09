import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum, IsString } from 'class-validator';
import { Sex } from '../commonEnums';

export class CreateEredoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  varsta: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rude: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  boli: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cauza_deces: string;
}
