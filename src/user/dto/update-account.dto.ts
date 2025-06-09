import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  oldPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rol: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  imsp: number;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
