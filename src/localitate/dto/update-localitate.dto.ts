import { PartialType } from '@nestjs/swagger';
import { CreateLocalitateDto } from './create-localitate.dto';

export class UpdateLocalitateDto extends PartialType(CreateLocalitateDto) {}
