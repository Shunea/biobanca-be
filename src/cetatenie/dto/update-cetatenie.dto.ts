import { PartialType } from '@nestjs/swagger';
import { CreateCetatenieDto } from './create-cetatenie.dto';

export class UpdateCetatenieDto extends PartialType(CreateCetatenieDto) {}
