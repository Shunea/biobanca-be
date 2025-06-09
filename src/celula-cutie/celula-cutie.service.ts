import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateCelulaCutieDto } from './dto/create-celula-cutie.dto';
import { UpdateCelulaCutieDto } from './dto/update-celula-cutie.dto';
import { CelulaCutie } from './entities/celula-cutie.entity';

@Injectable()
export class CelulaCutieService extends CommonCrudService<
  CelulaCutie,
  CreateCelulaCutieDto,
  UpdateCelulaCutieDto
> {
  constructor(
    @InjectRepository(CelulaCutie)
    protected readonly repository: Repository<CelulaCutie>,
  ) {
    super(repository);
  }

  async save(entity: CelulaCutie): Promise<CelulaCutie> {
    const res = await this.repository.save(entity);
    return res;
  }
}
