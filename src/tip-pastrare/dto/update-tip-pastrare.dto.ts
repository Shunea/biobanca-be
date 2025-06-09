import { PartialType } from '@nestjs/swagger';
import { CreateTipPastrareDto } from './create-tip-pastrare.dto';

export class UpdateTipPastrareDto extends PartialType(CreateTipPastrareDto) {}
