import { PartialType } from '@nestjs/swagger';
import { CreateCormDto } from './create-corm.dto';

export class UpdateCormDto extends PartialType(CreateCormDto) {}
