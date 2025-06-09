import { ApiPropertyOptional,ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateAnamnezaVietiDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_anamneza_vietii: string;

  @ApiProperty()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  anamneza_vietii_cimx: string;

  }
