import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Cetatenie extends CommonEntity {
  @Column({ type: String })
  name: string;
  @Column({ type: String })
  abreviation: string;
}
