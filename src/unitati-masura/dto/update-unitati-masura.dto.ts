import { PartialType } from '@nestjs/swagger';
import { CreateUnitatiMasuraDto } from './create-unitati-masura.dto';

export class UpdateUnitatiMasuraDto extends PartialType(
  CreateUnitatiMasuraDto,
) {}
