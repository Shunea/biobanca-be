import { Column, Entity, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Sectia } from 'src/sectia/entities/sectia.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Entity()
export class Imsp extends CommonEntity {
  @Column({ type: String })
  name: string;

  @Column({ type: String, unique: true, width: 8, default: null })
  code: string;

  @OneToMany(() => Proba, (proba) => proba.imsp)
  probe: Proba[];

  @OneToMany(() => Sectia, (sectia) => sectia.imsp)
  sectia: Sectia[];

  @OneToMany(() => User, (user) => user.imsp, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User[];
}
