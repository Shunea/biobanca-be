import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CIMX extends CommonEntity {
  @Column({ type: String })
  name: string;

  @Column({ type: String })
  code: string;

  @Column({ type: String, nullable: true })
  nume_cod: string;
}
