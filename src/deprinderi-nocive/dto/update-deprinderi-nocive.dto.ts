import { PartialType } from '@nestjs/swagger';
import { CreateDeprinderiNociveDto } from './create-deprinderi-nocive.dto';

export class UpdateDeprinderiNociveDto extends PartialType(CreateDeprinderiNociveDto) {}
