import { PartialType } from '@nestjs/swagger';
import { CreateProvenientaDonatorDto } from './create-provenienta-donator.dto';

export class UpdateProvenientaDonatorDto extends PartialType(CreateProvenientaDonatorDto) {}
