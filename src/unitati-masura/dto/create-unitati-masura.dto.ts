import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUnitatiMasuraDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  abreviation: string;
}
