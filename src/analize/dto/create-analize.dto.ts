
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnalizeDto {
  @ApiProperty()
  @IsString()
  name: string;
}