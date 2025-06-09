import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGrupaSangvinaDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  abreviation: string;
}
