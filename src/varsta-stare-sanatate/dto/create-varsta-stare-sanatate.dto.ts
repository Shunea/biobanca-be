import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVarstaStareSanatateDto {
  @ApiProperty()
  @IsString()
  name: string;
}
