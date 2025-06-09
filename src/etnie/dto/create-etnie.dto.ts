
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEtnieDto {
  @ApiProperty()
  @IsString()
  name: string;
}