import { PartialType } from '@nestjs/swagger';
import { CreateTipProiectDto } from './create-tip-proiect.dto';

export class UpdateTipProiectDto extends PartialType(CreateTipProiectDto) {}
