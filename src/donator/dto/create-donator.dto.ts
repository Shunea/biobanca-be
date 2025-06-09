import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Sex, Urban } from 'src/common/commonEnums';

export class CreateDonatorDto {
  @ApiProperty()
  @IsString()
  IDNP: string;

  @ApiProperty()
  @IsString()
  prenume: string;

  @ApiProperty()
  @IsString()
  nume: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronimicul: string;

  @ApiProperty()
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty()
  @IsNumber()
  varsta: number;

  @ApiProperty()
  @IsString()
  data_nasterii: string;

  @ApiProperty()
  @IsEnum(Urban)
  loc_de_trai: Urban;

  @ApiProperty()
  @Transform((value) => value.hasOwnProperty("value") ? value.value : value)
  @IsString()
  statut: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  inaltime: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  greutate: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  casatorit: string;

  @ApiProperty()
  @IsString()
  rh: string;

  @ApiProperty()
  @IsString()
  grupa_sangvina: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  lucreaza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? value.value : ''))
  @IsString()
  profesie_specializare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  loc_de_munca: string;

  @ApiProperty()
  @IsString()
  cetatenie: string;

  @ApiProperty()
  @IsString()
  etnie: string;

  @ApiProperty()
  @Transform((value) => value.hasOwnProperty("value") ? value.value : value)
  @IsString()
  rp_mn: string;

  @ApiProperty()
  @Transform((value) => value.hasOwnProperty("value") ? value.value : value)
  @IsString()
  rp_localitate: string;

  @ApiProperty()
  @IsString()
  rp_strada: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sursa_provenienta_donator: string;

  @ApiProperty()
  @IsString()
  imsp_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_vaccin: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  tip_vaccin: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_anamneza_vietii: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  anamneza_vietii_cimx: string;
}
