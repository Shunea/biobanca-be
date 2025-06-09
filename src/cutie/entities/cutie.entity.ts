import { CelulaCutie } from 'src/celula-cutie/entities/celula-cutie.entity';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Frigider } from 'src/frigider/entities/frigider.entity';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Cutie extends CommonEntity {
  @Column()
  nr_cutie: string;

  @Column({
    type: 'enum',
    enum: ['Mare', 'Mica'],
  })
  tip_cutie: string;

  @Column({
    type: 'int',
    default: () => "(CASE WHEN tip_cutie = 'Mare' THEN 10 ELSE 9 END)",
  })
  randuri: number;

  @Column({
    type: 'int',
    default: () => "(CASE WHEN tip_cutie = 'Mare' THEN 10 ELSE 9 END)",
  })
  coloane: number;

  @Column({
    type: 'int',
    default: () => "(CASE WHEN tip_cutie = 'Mare' THEN 100 ELSE 81 END)",
  })
  free_space: number;

  @ManyToOne(() => Frigider, (frigider) => frigider.cutii)
  @JoinColumn({ name: 'frigider_id' })
  frigider: Frigider;

  @Column({ type: String, default: null })
  frigider_id: string;

  @OneToMany(() => Proba, (proba) => proba.cutie)
  probe: Proba[];

  @OneToMany(() => ProbaAlicotata, (proba_alicotata) => proba_alicotata.cutie)
  probe_alicotate: ProbaAlicotata[];

  @OneToMany(() => CelulaCutie, (celula_cutie) => celula_cutie.cutie)
  celule: CelulaCutie[];

  @BeforeInsert()
  @BeforeUpdate()
  decrementFreeSpace() {
    let occupiedSpace = 0;

    this.celule.forEach((celula) => {
      let isOccupied = false;
      this.probe.forEach((proba) => {
        if (proba.alicotata) {
          proba.probe_alicotate.forEach((proba_alicotata) => {
            if (
              proba_alicotata.rand === celula.row_number &&
              proba_alicotata.coloana === celula.column_number
            ) {
              isOccupied = true;
              occupiedSpace += 1;
            }
          });
        } else {
          if (
            proba.rand === celula.row_number &&
            proba.coloana === celula.column_number
          ) {
            isOccupied = true;
            occupiedSpace += 1;
          }
        }
      });
      celula.is_free = !isOccupied;
    });

    this.free_space = this.coloane * this.randuri - occupiedSpace;
  }
}
