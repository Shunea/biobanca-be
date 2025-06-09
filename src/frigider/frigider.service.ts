import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateFrigiderDto } from './dto/create-frigider.dto';
import { UpdateFrigiderDto } from './dto/update-frigider.dto';
import { Frigider } from './entities/frigider.entity';

@Injectable()
export class FrigiderService extends CommonCrudService<
  Frigider,
  CreateFrigiderDto,
  UpdateFrigiderDto
> {
  constructor(
    @InjectRepository(Frigider)
    protected readonly repository: Repository<Frigider>,
  ) {
    super(repository);
  }

  async findFreeFrigidere() {
    const qb = this.repository.createQueryBuilder('frigider');
    qb.leftJoinAndSelect('frigider.cutii', 'cutie');
    qb.where('cutie.id is not null and cutie.free_space > 0');

    const res = await qb.getMany();
    return res;
  }

  async findByNumber(nr_frigider: number) {
    const res = await this.repository.findOne({ where: { nr_frigider } });
    return res;
  }
}
