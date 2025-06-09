import { PartialType } from '@nestjs/swagger';
import { CreateCIMXDto } from './create-cimx.dto';

export class UpdateCIMXDto extends PartialType(CreateCIMXDto) {}
