import { Column } from 'typeorm';
import { CommonEntity } from './commonClass.entity';

export abstract class CommonVaccinEntity extends CommonEntity {
  @Column({ type: 'date' })
  data_vaccin: string;

  @Column({ type: String })
  tip_vaccin: string;
}
