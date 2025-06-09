import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class ActivationCodes extends CommonEntity {
  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: false })
  expireDate: Date;

  @ManyToOne(() => User, (user) => user.activationCode, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
