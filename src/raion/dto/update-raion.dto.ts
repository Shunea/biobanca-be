import { PartialType } from '@nestjs/swagger';
import { CreateRaionDto } from './create-raion.dto';

export class UpdateRaionDto extends PartialType(CreateRaionDto) {}
