import { Controller } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CreateVaccinDto } from './dto/create-vaccin.dto';
import { UpdateVaccinDto } from './dto/update-vaccin.dto';
import { Vaccin } from './entities/vaccin.entity';
import { VaccinService } from './vaccin.service';

@Controller('vaccin')
export class VaccinController extends ControllerFactory<
  Vaccin,
  CreateVaccinDto,
  UpdateVaccinDto
>(CreateVaccinDto, UpdateVaccinDto) {
  constructor(protected readonly vaccinService: VaccinService) {
    super();
  }
}
