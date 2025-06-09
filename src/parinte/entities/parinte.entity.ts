import { CommonEredoEntity } from 'src/common/entity/commonEredo.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Parinte extends CommonEredoEntity {
  @ManyToOne(() => Proba, (proba) => proba.parinti, {
    onDelete: 'CASCADE',
  })
  proba: Proba;
}
