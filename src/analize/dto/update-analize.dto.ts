import { PartialType } from '@nestjs/swagger';
import { CreateAnalizeDto } from './create-analize.dto';

export class UpdateAnalizeDto extends PartialType(CreateAnalizeDto) {}
