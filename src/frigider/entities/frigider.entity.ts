import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Cutie } from 'src/cutie/entities/cutie.entity';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Frigider extends CommonEntity {
  @Column()
  nr_frigider: number;

  @Column()
  randuri: number;

  @Column()
  coloane: number;

  @Column()
  zona_probei: string;

  @OneToMany(() => Cutie, (cutie) => cutie.frigider)
  cutii: Cutie[];

  @OneToMany(() => Proba, (proba) => proba.frigider)
  probe: Proba[];

  @OneToMany(
    () => ProbaAlicotata,
    (proba_alicotata) => proba_alicotata.frigider,
  )
  probe_alicotate: ProbaAlicotata[];
}
