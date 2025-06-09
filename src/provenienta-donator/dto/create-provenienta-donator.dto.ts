import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProvenientaDonatorDto {
  @ApiProperty()
  @IsString()
  name: string;
}
