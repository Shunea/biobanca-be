import { CommonAnamnezaVietiiEntity } from 'src/common/entity/commonAnamnezaVietii.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class AnamnezaVietii extends CommonAnamnezaVietiiEntity {
    @ManyToOne(() => Proba, (proba) => proba.anamneza_vietii, {
      onDelete: 'CASCADE',
    })
    proba: Proba;
  }
