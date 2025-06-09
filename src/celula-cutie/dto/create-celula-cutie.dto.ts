import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsString } from 'class-validator';

export class CreateCelulaCutieDto {
  @ApiProperty()
  @IsNumber()
  row_number: number;

  @ApiProperty()
  @IsNumber()
  column_number: number;

  @ApiProperty()
  @IsString()
  cutie_id: string;
}
