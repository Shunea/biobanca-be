import { PartialType } from '@nestjs/swagger';
import { CreateTipVaccinDto } from './create-tip-vaccin.dto';

export class UpdateTipVaccinDto extends PartialType(CreateTipVaccinDto) {}
