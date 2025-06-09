import { Sex, Urban } from 'src/common/commonEnums';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Donator extends CommonEntity {
  @Column({ type: String, unique: true })
  IDNP: string;

  @Column({ type: String, unique: false })
  prenume: string;

  @Column({ type: String, unique: false })
  nume: string;

  @Column({ type: String, unique: false })
  patronimicul: string;

  @Column({ type: 'enum', enum: Sex, default: Sex.Male })
  sex: Sex;

  @Column({ type: Number })
  varsta: number;

  @Column({ type: 'date', default: null })
  data_nasterii: string;

  @Column({ type: 'enum', enum: Urban, default: Urban.Urban })
  loc_de_trai: Urban;

  @Column({ type: String })
  statut: string;

  @Column({ type: Number, unique: false, nullable: true })
  inaltime: number;

  @Column({ type: Number, unique: false, nullable: true })
  greutate: number;

  @Column({ type: String })
  casatorit: string;

  @Column({ type: String })
  rh: string;

  @Column({ type: String })
  grupa_sangvina: string;

  @Column({ type: String })
  lucreaza: string;

  @Column({ type: String })
  profesie_specializare: string;

  @Column({ type: String })
  loc_de_munca: string;

  @Column({ type: String })
  cetatenie: string;

  @Column({ type: String })
  etnie: string;

  @Column({ type: String })
  rp_mn: string;

  @Column({ type: String })
  rp_localitate: string;

  @Column({ type: String })
  rp_strada: string;

  @Column({ type: String })
  sursa_provenienta_donator: string;

  @Column({ type: String, nullable: true })
  data_vaccin: string;
  
  @Column({ type: String, nullable: true })
  tip_vaccin: string;

  @Column({ type: String, nullable: true })
  data_anamneza_vietii: string;
  
  @Column({ type: String, nullable: true })
  anamneza_vietii_cimx: string;

  @Column({ type: String })
  imsp_id: string;

  @OneToMany(() => Proba, (proba) => proba.donator)
  probe: Proba[];
}
