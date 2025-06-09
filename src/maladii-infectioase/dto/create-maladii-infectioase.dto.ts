import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMaladiiInfectioaseDto {
  @ApiProperty()
  @IsString()
  name: string;
}
