
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRaionDto {
  @ApiProperty()
  @IsString()
  name: string;

  // @ApiProperty()
  // @IsNumber()
  // code: number;
}