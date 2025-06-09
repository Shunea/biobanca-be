import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ProvenientaDonator extends CommonEntity {
  @Column()
  name: string;
}
