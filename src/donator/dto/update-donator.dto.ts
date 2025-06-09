import { PartialType } from '@nestjs/swagger';
import { CreateDonatorDto } from './create-donator.dto';

export class UpdateDonatorDto extends PartialType(CreateDonatorDto) {}
