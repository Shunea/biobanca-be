import { PartialType } from '@nestjs/swagger';
import { CreateGrupaSangvinaDto } from './create-grupa-sangvina.dto';

export class UpdateGrupaSangvinaDto extends PartialType(
  CreateGrupaSangvinaDto,
) {}
