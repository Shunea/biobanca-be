import { Controller } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CreateRudeDto } from './dto/create-rude.dto';
import { UpdateRudeDto } from './dto/update-rude.dto';
import { Rude } from './entity/rude.entity';
import { RudeService } from './rude.service';

@Controller('rude')
export class RudeController extends ControllerFactory<
  Rude,
  CreateRudeDto,
  UpdateRudeDto
>(CreateRudeDto, UpdateRudeDto) {
  constructor(protected readonly service: RudeService) {
    super();
  }
}
