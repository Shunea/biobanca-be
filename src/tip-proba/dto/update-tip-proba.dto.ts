import { PartialType } from '@nestjs/swagger';
import { CreateTipProbaDto } from './create-tip-proba.dto';

export class UpdateTipProbaDto extends PartialType(CreateTipProbaDto) {}
