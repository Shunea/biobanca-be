import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFrigiderDto {
  @ApiProperty()
  @IsNumber()
  nr_frigider: number;

  @ApiProperty()
  @IsNumber()
  randuri: number;

  @ApiProperty()
  @IsNumber()
  coloane: number;

  @ApiProperty()
  @IsString()
  zona_probei: string;
}
