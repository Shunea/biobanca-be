import { PartialType } from '@nestjs/swagger';
import { CreateRudeDto } from './create-rude.dto';

export class UpdateRudeDto extends PartialType(CreateRudeDto) {}
