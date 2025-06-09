import { CommonVaccinEntity } from 'src/common/entity/commonVaccin.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Vaccin extends CommonVaccinEntity {
    @ManyToOne(() => Proba, (proba) => proba.vaccin, {
      onDelete: 'CASCADE',
    })
    proba: Proba;
  }
