import { Controller } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CelulaCutieService } from './celula-cutie.service';
import { CreateCelulaCutieDto } from './dto/create-celula-cutie.dto';
import { UpdateCelulaCutieDto } from './dto/update-celula-cutie.dto';
import { CelulaCutie } from './entities/celula-cutie.entity';

@Controller('celula-cutie')
export class CelulaCutieController extends ControllerFactory<
  CelulaCutie,
  CreateCelulaCutieDto,
  UpdateCelulaCutieDto
>(CreateCelulaCutieDto, UpdateCelulaCutieDto) {
  constructor(protected readonly service: CelulaCutieService) {
    super();
  }
}
