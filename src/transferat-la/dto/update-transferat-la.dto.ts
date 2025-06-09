import { PartialType } from '@nestjs/swagger';
import { CreateTransferatLaDto } from './create-transferat-la.dto';

export class UpdateTransferatLaDto extends PartialType(CreateTransferatLaDto) {}
