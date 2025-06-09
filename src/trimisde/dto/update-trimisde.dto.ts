import { PartialType } from '@nestjs/swagger';
import { CreateTrimisDeDto } from './create-trimisde.dto';

export class UpdateTrimisDeDto extends PartialType(CreateTrimisDeDto) {}
