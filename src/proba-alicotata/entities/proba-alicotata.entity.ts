import { StatutProba } from 'src/common/commonEnums';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Cutie } from 'src/cutie/entities/cutie.entity';
import { Frigider } from 'src/frigider/entities/frigider.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProbaAlicotata extends CommonEntity {
  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  rand: number;

  @Column({ type: Number })
  coloana: number;

  @Column({ type: String })
  tip_pastrare: string;

  @Column({ type: String })
  zona_pastrare: string;

  @Column({ type: 'enum', enum: StatutProba, default: StatutProba.Asteptare })
  statutul_probei: string;

  @Column({ type: String, nullable: true })
  modificare_statut: string;

  @Column({ type: Date, nullable: true })
  modificare_statut_date: Date;

  @Column({ type: String, nullable: true })
  tip_analiza: string;

  @Column({ type: String, nullable: true })
  laborator_predat: string;

  @Column({ type: String, nullable: true })
  persoana_efectuare_analiza: string;

  @Column({ type: "date", nullable: true })
  data_predare_analiza: string;

  @Column({ type: String, nullable: true })
  descriere_rezultat: string;

  @Column({ type: String, nullable: true })
  rezultat_ilustrativ: string;

  @Column({ type: String, nullable: true })
  cauza_distrugere: string;

  @Column({ type: String, nullable: true })
  cerere_distrugere: string;

  @Column({ type: "date", nullable: true })
  data_distrugere: string;

  @Column({ type: "date", nullable: true })
  data_eliberare_proiect: string;

  @ManyToOne(() => Cutie, { eager: true })
  @JoinColumn({ name: 'cutie_id' })
  cutie: Cutie;

  @Column({ type: String, default: null })
  cutie_id: string;

  @ManyToOne(() => Frigider, { eager: true })
  @JoinColumn({ name: 'frigider_id' })
  frigider: Frigider;

  @Column({ type: String, default: null })
  frigider_id: string;

  @ManyToOne(() => Proba, (proba) => proba.probe_alicotate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proba_id' })
  proba: Proba;

  @Column({ type: String, default: null })
  proba_id: string;

  @ManyToOne(() => ProbaAlicotata, { eager: true })
  @JoinColumn({ name: 'parent_id' })
  parent: ProbaAlicotata;

  @Column({ type: String, nullable: true })
  parent_id: string;
}
