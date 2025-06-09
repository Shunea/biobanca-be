import { PartialType } from '@nestjs/swagger';
import { CreateStareGeneralaPrelevareDto } from './create-stare-generala-prelevare.dto';

export class UpdateStareGeneralaPrelevareDto extends PartialType(CreateStareGeneralaPrelevareDto) {}
