import { PartialType } from '@nestjs/swagger';
import { CreateCutieDto } from './create-cutie.dto';

export class UpdateCutieDto extends PartialType(CreateCutieDto) {}
