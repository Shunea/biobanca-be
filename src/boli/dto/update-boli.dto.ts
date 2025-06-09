import { PartialType } from '@nestjs/swagger';
import { CreateBoliDto } from './create-boli.dto';

export class UpdateBoliDto extends PartialType(CreateBoliDto) {}
