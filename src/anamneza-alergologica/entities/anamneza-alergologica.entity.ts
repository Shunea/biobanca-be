import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AnamnezaAlergologica extends CommonEntity {
  @Column()
  name: string;
}
