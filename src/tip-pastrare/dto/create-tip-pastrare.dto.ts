import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTipPastrareDto {
  @ApiProperty()
  @IsString()
  name: string;
}
