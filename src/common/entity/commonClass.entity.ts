import {
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  public deletedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  lastInteractedAt: Date;

  @Column({ default: 'API', select: false })
  lastInteractedUserId: string;
}
