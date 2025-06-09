import { Column } from 'typeorm';
import { CommonEntity } from './commonClass.entity';

export abstract class CommonAnamnezaVietiiEntity extends CommonEntity {
  @Column({ type: 'date' })
  data_anamneza_vietii: string;

  @Column({ type: String })
  anamneza_vietii_cimx: string;
}
