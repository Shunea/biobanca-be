import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnamnezaVietiiDto } from 'src/anamneza-vietii/dto/create-anamneza-vietii.dto';
import { StatutProba } from 'src/common/commonEnums';
import { CreateVaccinuriDto } from 'src/common/dto/create-vaccinuri.dto';
import { CreateCopiiDto } from 'src/copii/dto/create-copii.dto';
import { CreateParinteDto } from 'src/parinte/dto/create-parinte.dto';
import { CreateProbaAlicotataDto } from 'src/proba-alicotata/dto/create-proba-alicotata.dto';
import { CreateRudeDto } from 'src/rude/dto/create-rude.dto';

export class CreateProbaDto {
  @ApiProperty()
  @IsString()
  data_prelevarii: string;

  @ApiProperty()
  @IsString()
  data_receptionare: string;

  @ApiProperty()
  @IsString()
  nume_proba: string;

  @ApiProperty()
  @IsString()
  tip_proba: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tip_analiza:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  laborator_predat:string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  persoana_efectuare_analiza:string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  data_predare_analiza:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  statutul_probei: string;

  @ApiProperty()
  @IsString()
  biospecimen_prelevat: string;

  @ApiProperty()
  @IsString()
  persoana_prelevarii: string;


  @ApiProperty()
  @IsString()
  persoana_receptionare: string;

  @ApiProperty()
  @IsString()
  sursa_provenienta_proba: string;

  @ApiProperty()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  cod_si_diagnostic: string;

  @ApiProperty()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  comorbiditati: string;

  @ApiProperty()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsString()
  boli_autoimune: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stare_generala: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  anamneza_vietii_check: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnamnezaVietiiDto)
  anamneza_vietii: CreateAnamnezaVietiiDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  vaccin_check: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVaccinuriDto)
  vaccin: CreateVaccinuriDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  TA: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  puls: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  perioada_maturizarii_sexuale: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  nr_sarcini: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  nr_nasteri: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  nr_avorturi: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  aparitia_perioadei_de_menopauza: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  fumeaza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ce_cantitate_fumeaza: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  de_cati_ani_fumeaza: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  perioada_abstenenta_fumeaza: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  consum_alcool: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ce_cantitate_alcool: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  de_cati_ani_alcool: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  subst_narc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ce_cantitate_narcotice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  de_cati_ani_narcotice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  alte_deprinderi_daunatoare: string;

  @ApiProperty()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  anamneza_alergologica_check: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map((v) => v.value).join(';') : value)
  @IsOptional()
  @IsString()
  anamneza_alergologica: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateParinteDto)
  parinti: CreateParinteDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCopiiDto)
  copii: CreateCopiiDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRudeDto)
  rude: CreateRudeDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  relatii_in_familie: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  venerice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  psiho_neurologice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  alergice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  endocrine: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  boli_metabolice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  alcoolism: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  neoplasme: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  boli_hematopoetice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  lezarea_organelor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cantitate_proba: number;

  @ApiProperty()
  @IsString()
  unitate_masura: string;

  @ApiProperty()
  @Transform(({ value }) => (value ? 'Da' : 'Nu'))
  @IsString()
  alicotata: string;

  @ApiProperty()
  @IsNumber()
  nr_parti: number;

  @ApiProperty()
  @IsNumber()
  nr_proba: number;

  @ApiProperty()
  @IsNumber()
  cantitate_unitate: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rand: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  coloana: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tip_pastrare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zona_pastrare: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProbaAlicotataDto)
  probe_alicotate: CreateProbaAlicotataDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cutie_id: string;

  @ApiProperty()
  @IsString()
  donator_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  frigider_id: string;

  @ApiProperty()
  @IsString()
  IMSP: string;

  @ApiProperty()
  @IsString()
  imsp_id: string;

  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  project_id: string;
}
