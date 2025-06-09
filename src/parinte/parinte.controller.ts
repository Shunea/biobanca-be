import { Controller } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CreateParinteDto } from './dto/create-parinte.dto';
import { UpdateParinteDto } from './dto/update-parinte.dto';
import { Parinte } from './entities/parinte.entity';
import { ParinteService } from './parinte.service';

@Controller('parinte')
export class ParinteController extends ControllerFactory<
  Parinte,
  CreateParinteDto,
  UpdateParinteDto
>(CreateParinteDto, UpdateParinteDto) {
  constructor(protected readonly service: ParinteService) {
    super();
  }
}
