import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Localitate extends CommonEntity {
  @Column({ type: String })
  name: string;

  @Column({ type: Number, unique: true, width: 8, nullable: true })
  code: number;

  @Column({ type: String, nullable: true })
  type: string;
}
