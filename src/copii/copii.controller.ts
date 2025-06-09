import { Controller } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CopiiService } from './copii.service';
import { CreateCopiiDto } from './dto/create-copii.dto';
import { UpdateCopiiDto } from './dto/update-copii.dto';
import { Copii } from './entities/copii.entity';

@Controller('copii')
export class CopiiController extends ControllerFactory<
  Copii,
  CreateCopiiDto,
  UpdateCopiiDto
>(CreateCopiiDto, UpdateCopiiDto) {
  constructor(protected readonly service: CopiiService) {
    super();
  }
}
