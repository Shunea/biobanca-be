import { PartialType } from '@nestjs/swagger';
import { CreateAnamnezaAlergologicaDto } from './create-anamneza-alergologica.dto';

export class UpdateAnamnezaAlergologicaDto extends PartialType(CreateAnamnezaAlergologicaDto) {}
