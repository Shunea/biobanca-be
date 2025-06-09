import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoliDto {
  @ApiProperty()
  @IsString()
  name: string;
}
