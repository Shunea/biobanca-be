import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Column } from 'typeorm';

export class Boli extends CommonEntity {
  @Column()
  name: string;
}
