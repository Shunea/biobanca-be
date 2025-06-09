import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTrimisDeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
