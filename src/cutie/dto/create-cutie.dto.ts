import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCutieDto {
  @ApiProperty()
  @IsString()
  nr_cutie: string;

  @ApiProperty()
  @IsString()
  tip_cutie: string;

  @ApiProperty()
  @IsString()
  frigider_id: string;
}
