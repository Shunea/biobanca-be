import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateRudeDto } from './dto/create-rude.dto';
import { UpdateRudeDto } from './dto/update-rude.dto';
import { Rude } from './entity/rude.entity';

@Injectable()
export class RudeService extends CommonCrudService<
  Rude,
  CreateRudeDto,
  UpdateRudeDto
> {
  constructor(
    @InjectRepository(Rude)
    protected readonly repository: Repository<Rude>,
  ) {
    super(repository);
  }
}
