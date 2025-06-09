import { PartialType } from '@nestjs/swagger';
import { CreateBiospecimenDto } from './create-biospecimen.dto';

export class UpdateBiospecimenDto extends PartialType(CreateBiospecimenDto) {}
