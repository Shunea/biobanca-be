import { PartialType } from '@nestjs/swagger';
import { CreateCelulaCutieDto } from './create-celula-cutie.dto';

export class UpdateCelulaCutieDto extends PartialType(CreateCelulaCutieDto) {}
