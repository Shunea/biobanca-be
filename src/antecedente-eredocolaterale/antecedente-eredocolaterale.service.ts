import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAntecedenteEredocolateraleDto } from './dto/create-antecedente-eredocolaterale.dto';
import { UpdateAntecedenteEredocolateraleDto } from './dto/update-antecedente-eredocolaterale.dto';
import { AntecedenteEredocolaterale } from './entities/antecedente-eredocolaterale.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class AntecedenteEredocolateraleService {
  constructor(
    @InjectRepository(AntecedenteEredocolaterale)
    readonly repo: Repository<AntecedenteEredocolaterale>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll() {
    const antecedente = await this.repo.find();
    const probe = await this.probaRepo.find();

    const conditionLookup = {
      venerice: "Venerice",
      psiho_neurologice: "Psiho neurologice",
      alergice: "Alergice",
      endocrine: "Endocrine",
      boli_metabolice: "Boli metabolice",
      alcoolism: "Alcoolism",
      neoplasme: "Neoplasme",
      boli_hematopoetice: "Boli hematopoetice",
      lezarea_organelor: "Lezarea organelor şi sistemelor, în care au fost depistate dereglări patologice la bolnavul examinat"
    };
    
    for (const antecedent of antecedente) {
      for (const proba of probe) {
        for (const key in conditionLookup) {
          if (antecedent.name === conditionLookup[key] && proba[key] === "Da") {
            antecedent["utilizat"] = true;
            break;
          }
        }
      }
    }

    return antecedente;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createAntecedenteEredocolateraleDto: CreateAntecedenteEredocolateraleDto) {
    return await this.repo.save(createAntecedenteEredocolateraleDto);
  }

  async update(id: string, updateAntecedenteEredocolateraleDto: UpdateAntecedenteEredocolateraleDto) {
    return await this.repo.update(id, updateAntecedenteEredocolateraleDto);
  }

  async remove(id: string) {
    const antecedent = await this.repo.findOneBy({ id });
    const qb = this.probaRepo.createQueryBuilder("proba");

    const conditions = {
      "Venerice": "proba.venerice = :value",
      "Psiho neurologice": "proba.psiho_neurologice = :value",
      "Alergice": "proba.alergice = :value",
      "Endocrine": "proba.endocrine = :value",
      "Boli metabolice": "proba.boli_metabolice = :value",
      "Alcoolism": "proba.alcoolism = :value",
      "Neoplasme": "proba.neoplasme = :value",
      "Boli hematopoetice": "proba.boli_hematopoetice = :value",
      "Lezarea organelor şi sistemelor, în care au fost depistate dereglări patologice la bolnavul examinat": "proba.lezarea_organelor = :value"
    };

    const condition = conditions[antecedent.name];

    if (condition) {
      qb.where(condition, { value: "Da" });
    }

    const proba = await qb.getOne();

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
