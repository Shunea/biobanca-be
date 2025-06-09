import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AntecedenteEredocolaterale extends CommonEntity {
  @Column()
  name: string;
}
