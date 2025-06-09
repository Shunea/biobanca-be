import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  tip: string;

  @ApiProperty()
  @IsString()
  denumire: string;

  @ApiProperty()
  @IsString()
  data_inceput: string;

  @ApiProperty()
  @IsString()
  conducator: string;

  @ApiProperty()
  @IsString()
  scopul: string;

  @ApiProperty()
  @IsString()
  obiective: string;

  @ApiProperty()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  aprobare_comitet: string;

  @ApiProperty()
  @IsString()
  data_finalizare: string;

  @ApiProperty()
  @IsString()
  rezumat: string;
}
