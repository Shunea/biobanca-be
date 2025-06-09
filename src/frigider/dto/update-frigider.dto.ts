import { PartialType } from '@nestjs/swagger';
import { CreateFrigiderDto } from './create-frigider.dto';

export class UpdateFrigiderDto extends PartialType(CreateFrigiderDto) {}
