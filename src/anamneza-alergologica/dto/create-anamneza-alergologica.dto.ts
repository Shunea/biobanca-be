import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateAnamnezaAlergologicaDto {
    @ApiProperty()
    @IsString()
    name: string;
}
