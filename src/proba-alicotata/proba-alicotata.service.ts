import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateProbaAlicotataDto } from './dto/create-proba-alicotata.dto';
import { UpdateProbaAlicotataDto } from './dto/update-proba-alicotata.dto';
import { ProbaAlicotata } from './entities/proba-alicotata.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProbaAlicotataService {
  constructor(
    @InjectRepository(ProbaAlicotata)
    private readonly probaAlicotataRepository: Repository<ProbaAlicotata>,
  ) {}

  create(createProbaAlicotataDto: CreateProbaAlicotataDto) {
    return this.probaAlicotataRepository.save(createProbaAlicotataDto);
  }

  findAll() {
    return this.probaAlicotataRepository.find();
  }

  getAllDeleted() {
    return this.probaAlicotataRepository.createQueryBuilder('proba_alicotata')
      .where({ deletedAt: Not(IsNull()) })
      .withDeleted()
      .leftJoinAndSelect('proba_alicotata.proba', 'proba')
      .getMany();
  }

  findOne(id: string) {
    return this.probaAlicotataRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProbaAlicotataDto: UpdateProbaAlicotataDto, user: User) {
    if (updateProbaAlicotataDto.statutul_probei) {
      updateProbaAlicotataDto.modificare_statut = `${user.name} ${user.lastname}`;
      updateProbaAlicotataDto.modificare_statut_date = new Date();
    }

    await this.probaAlicotataRepository.createQueryBuilder()
      .update(ProbaAlicotata)
      .set(updateProbaAlicotataDto)
      .where("id = :id", { id })
      .execute();
  
    return await this.probaAlicotataRepository.createQueryBuilder('proba_alicotata')
      .where({ id })
      .getOne();
  }

  remove(id: string) {
    return this.probaAlicotataRepository.softDelete(id);
  }
}
