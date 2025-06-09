import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateVarstaStareSanatateDto } from './dto/create-varsta-stare-sanatate.dto';
import { UpdateVarstaStareSanatateDto } from './dto/update-varsta-stare-sanatate.dto';
import { VarstaStareSanatate } from './entities/varsta-stare-sanatate.entity';
import { Parinte } from 'src/parinte/entities/parinte.entity';
import { Copii } from 'src/copii/entities/copii.entity';
import { Rude } from 'src/rude/entity/rude.entity';

@Injectable()
export class VarstaStareSanatateService {
  constructor(
    @InjectRepository(VarstaStareSanatate)
    readonly repo: Repository<VarstaStareSanatate>,
    @InjectRepository(Parinte)
    readonly parinteRepo: Repository<Parinte>,
    @InjectRepository(Copii)
    readonly copiiRepo: Repository<Copii>,
    @InjectRepository(Rude)
    readonly rudeRepo: Repository<Rude>
  ) {}

  async findAll() {
    const stari = await this.repo.find();
    const parinti = await this.parinteRepo.find({ where: { stare: In(stari.map(({ name }) => name)) } });
    const copii = await this.copiiRepo.find({ where: { stare: In(stari.map(({ name }) => name)) } });
    const rude = await this.rudeRepo.find({ where: { stare: In(stari.map(({ name }) => name)) } });
    const objects = [...parinti, ...copii, ...rude];
    const stareNameSet = new Set(stari.map(({ name }) => name));

    for (const obj of objects) {
      if (stareNameSet.has(obj.stare)) {
        const stare = stari.find(({ name }) => name === obj.stare);
        stare['utilizat'] = true;
      }
    }

    return stari;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createVarstaStareSanatateDto: CreateVarstaStareSanatateDto) {
    return await this.repo.save(createVarstaStareSanatateDto);
  }

  async update(id: string, updateVarstaStareSanatateDto: UpdateVarstaStareSanatateDto) {
    return await this.repo.update(id, updateVarstaStareSanatateDto);
  }

  async remove(id: string) {
    const stare = await this.repo.findOneBy({ id });

    const parinte = await this.parinteRepo.findOneBy({ stare: stare.name });
    if (parinte) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    const copii = await this.copiiRepo.findOneBy({ stare: stare.name });
    if (copii) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    const rude = await this.rudeRepo.findOneBy({ stare: stare.name });
    if (rude) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
