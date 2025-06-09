import { PartialType } from '@nestjs/swagger';
import { CreateMaladiiInfectioaseDto } from './create-maladii-infectioase.dto';

export class UpdateMaladiiInfectioaseDto extends PartialType(CreateMaladiiInfectioaseDto) {}
