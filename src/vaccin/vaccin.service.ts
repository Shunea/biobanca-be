import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateVaccinDto } from './dto/create-vaccin.dto';
import { UpdateVaccinDto } from './dto/update-vaccin.dto';
import { Vaccin } from './entities/vaccin.entity';

@Injectable()
export class VaccinService extends CommonCrudService<
  Vaccin,
  CreateVaccinDto,
  UpdateVaccinDto
> {
  constructor(
    @InjectRepository(Vaccin)
    protected readonly repository: Repository<Vaccin>,
  ) {
    super(repository);
  }
}
