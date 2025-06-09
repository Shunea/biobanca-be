import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Barcode extends CommonEntity {
  @Column({ type: "text", nullable: false })
  public data: string;

  @Column({ name: "proba_id", unique: false, nullable: false })
  public probaId: string;

  @Column({ name: "proba_name", nullable: false })
  public probaName: string;
  
  @Column({ name: "proba_alicotata_id", unique: true, nullable: true })
  public probaAlicotataId: string;

  @ManyToOne(() => Proba, (proba) => proba.barcodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proba_id' })
  public proba: Proba;
}
