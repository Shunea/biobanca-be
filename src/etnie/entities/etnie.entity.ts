import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Etnie extends CommonEntity {
  @Column({ type: String })
  name: string;
}
