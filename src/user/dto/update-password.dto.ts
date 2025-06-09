import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  active: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  id: string;
}
