import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatutDto {
  @ApiProperty()
  @IsString()
  name: string;
}
