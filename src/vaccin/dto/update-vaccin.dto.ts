import { PartialType } from '@nestjs/swagger';
import { CreateVaccinDto } from './create-vaccin.dto';

export class UpdateVaccinDto extends PartialType(CreateVaccinDto) {}
