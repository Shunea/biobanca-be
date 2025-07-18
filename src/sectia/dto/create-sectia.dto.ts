import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSectiaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  imsp_id: string;
}
