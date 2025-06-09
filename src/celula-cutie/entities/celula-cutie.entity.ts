import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Cutie } from 'src/cutie/entities/cutie.entity';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class CelulaCutie extends CommonEntity {
  @Column()
  row_number: number;

  @Column()
  column_number: number;

  @Column({ default: true })
  is_free: boolean;

  @ManyToOne(() => Cutie, (cutie) => cutie.celule)
  @JoinColumn({ name: 'cutie_id' })
  cutie: Cutie;
}
