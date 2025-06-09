import { CommonEredoEntity } from 'src/common/entity/commonEredo.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Copii extends CommonEredoEntity {
  @ManyToOne(() => Proba, (proba) => proba.copii, {
    onDelete: 'CASCADE',
  })
  proba: Proba;
}
