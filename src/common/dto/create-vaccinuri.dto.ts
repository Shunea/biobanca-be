import { ApiPropertyOptional,ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateVaccinuriDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_vaccin: string;

  @ApiProperty()
  // @ApiPropertyOptional()
  // @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  tip_vaccin: string;

  }
