import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UnitatiMasura extends CommonEntity {
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: false })
  abreviation: string;
}
