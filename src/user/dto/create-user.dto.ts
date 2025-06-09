import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Imsp } from 'src/imsp/entities/imsp.entity';
import { Role } from '../enums/roles.enum';

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;
  
  @ApiProperty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  imsp: Imsp;

  @ApiProperty()
  @IsEnum(Role)
  rol: Role;

  @ApiPropertyOptional()
  @IsOptional()
  active: boolean;
}
