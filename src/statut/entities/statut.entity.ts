import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Statut extends CommonEntity {
  @Column({ type: String })
  name: string;
}
