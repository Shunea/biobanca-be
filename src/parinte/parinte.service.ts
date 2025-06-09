import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateParinteDto } from './dto/create-parinte.dto';
import { UpdateParinteDto } from './dto/update-parinte.dto';
import { Parinte } from './entities/parinte.entity';

@Injectable()
export class ParinteService extends CommonCrudService<
  Parinte,
  CreateParinteDto,
  UpdateParinteDto
> {
  constructor(
    @InjectRepository(Parinte)
    protected readonly repository: Repository<Parinte>,
  ) {
    super(repository);
  }
}
