import { PartialType } from '@nestjs/swagger';
import { CreateVarstaStareSanatateDto } from './create-varsta-stare-sanatate.dto';

export class UpdateVarstaStareSanatateDto extends PartialType(CreateVarstaStareSanatateDto) {}
