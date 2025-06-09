import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Project extends CommonEntity {
  @Column({ type: String })
  tip: string;

  @Column({ type: String })
  denumire: string;

  @Column({ type: 'date' })
  data_inceput: string;

  @Column({ type: String })
  conducator: string;

  @Column({ type: String })
  scopul: string;

  @Column({ type: String })
  obiective: string;

  @Column({ type: String })
  aprobare_comitet: string;

  @Column({ type: 'date' })
  data_finalizare: string;

  @Column({ type: String })
  rezumat: string;

  @OneToMany(() => Proba, (proba) => proba.project)
  probe: Proba[];
}
