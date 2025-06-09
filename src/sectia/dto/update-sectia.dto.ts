import { PartialType } from '@nestjs/swagger';
import { CreateSectiaDto } from './create-sectia.dto';

export class UpdateSectiaDto extends PartialType(CreateSectiaDto) {}
