import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateCopiiDto } from './dto/create-copii.dto';
import { UpdateCopiiDto } from './dto/update-copii.dto';
import { Copii } from './entities/copii.entity';

@Injectable()
export class CopiiService extends CommonCrudService<
  Copii,
  CreateCopiiDto,
  UpdateCopiiDto
> {
  constructor(
    @InjectRepository(Copii)
    protected readonly repository: Repository<Copii>,
  ) {
    super(repository);
  }
}
