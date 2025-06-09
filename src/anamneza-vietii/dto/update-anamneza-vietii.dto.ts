import { PartialType } from '@nestjs/swagger';
import { CreateAnamnezaVietiiDto } from './create-anamneza-vietii.dto';

export class UpdateAnamnezaVietiiDto extends PartialType(CreateAnamnezaVietiiDto) {}
