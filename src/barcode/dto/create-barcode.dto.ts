import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';

export class CreateBarcodeDto {
  @ApiProperty()
  @IsString()
  probaId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  probaAlicotataId?: string;
}
