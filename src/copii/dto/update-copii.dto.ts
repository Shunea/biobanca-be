import { PartialType } from '@nestjs/swagger';
import { CreateCopiiDto } from './create-copii.dto';

export class UpdateCopiiDto extends PartialType(CreateCopiiDto) {}
