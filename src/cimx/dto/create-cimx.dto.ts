import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCIMXDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;
}
