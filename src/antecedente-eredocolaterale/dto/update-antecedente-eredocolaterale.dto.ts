import { PartialType } from '@nestjs/swagger';
import { CreateAntecedenteEredocolateraleDto } from './create-antecedente-eredocolaterale.dto';

export class UpdateAntecedenteEredocolateraleDto extends PartialType(CreateAntecedenteEredocolateraleDto) {}
