import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAntecedenteEredocolateraleDto {
  @ApiProperty()
  @IsString()
  name: string;
}
