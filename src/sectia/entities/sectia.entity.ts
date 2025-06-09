import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Imsp } from 'src/imsp/entities/imsp.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Sectia extends CommonEntity {
  @Column({ type: String })
  name: string;

  @ManyToOne(() => Imsp, (imsp) => imsp.sectia)
  @JoinColumn({ name: 'imsp_id' })
  public imsp: Imsp;

  @Column({ type: String, default: null })
  imsp_id: string;
}
