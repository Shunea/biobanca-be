import { PartialType } from '@nestjs/swagger';
import { CreateImspDto } from './create-imsp.dto';

export class UpdateImspDto extends PartialType(CreateImspDto) {}
