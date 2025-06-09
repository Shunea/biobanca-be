import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class GrupaSangvina extends CommonEntity {
  @Column({ type: String })
  name: string;
  @Column({ type: String })
  abreviation: string;
}
