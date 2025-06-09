import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTipVaccinDto {
    @ApiProperty()
    @IsString()
    name: string;
}

