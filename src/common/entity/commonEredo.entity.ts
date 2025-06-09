import { Column } from 'typeorm';
import { Sex } from '../commonEnums';
import { CommonEntity } from './commonClass.entity';

export abstract class CommonEredoEntity extends CommonEntity {
  @Column({ type: Number, nullable: true })
  varsta: number;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @Column({ type: String, nullable: true })
  stare: string;

  @Column({ type: String, nullable: true })
  rude: string;

  @Column({ type: String, nullable: true })
  boli: string;

  @Column({ type: String, nullable: true })
  cauza_deces: string;
}
