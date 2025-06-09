import { PartialType } from '@nestjs/swagger';
import { CreateParinteDto } from './create-parinte.dto';

export class UpdateParinteDto extends PartialType(CreateParinteDto) {}
