import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Role } from '../enums/roles.enum';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { ActivationCodes } from 'src/activation_codes/entities/activation-codes.entity';
import { Imsp } from 'src/imsp/entities/imsp.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  lastname: string;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: true })
  active: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  @Column({ nullable: false, type: 'enum', enum: Role })
  rol: Role;

  @ManyToOne(() => Imsp, (imsp) => imsp.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  imsp: Imsp;

  @OneToMany(() => ActivationCodes, (activationCodes) => activationCodes.user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  activationCode: ActivationCodes[];

  @OneToMany(() => Proba, (proba) => proba.user)
  probe: Proba[];
}
