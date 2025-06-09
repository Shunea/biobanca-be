import { PartialType } from '@nestjs/swagger';
import { CreateEtnieDto } from './create-etnie.dto';

export class UpdateEtnieDto extends PartialType(CreateEtnieDto) {}
