import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Corm extends CommonEntity {
  @Column({ type: String })
  name: string;

  @Column({ type: Number, unique: true, width: 8 })
  code: number;
}
