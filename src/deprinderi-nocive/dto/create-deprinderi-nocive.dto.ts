import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDeprinderiNociveDto {
  @ApiProperty()
  @IsString()
  name: string;
}