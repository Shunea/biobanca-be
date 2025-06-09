import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProbaDto } from './create-proba.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateProbaDto extends PartialType(CreateProbaDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  statutul_probei: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modificare_statut: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  modificare_statut_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  laborator_predat: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tip_analiza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_predare_analiza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  persoana_efectuare_analiza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descriere_rezultat: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rezultat_ilustrativ: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cerere_distrugere: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cauza_distrugere: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_distrugere: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_eliberare_proiect: string;
}
