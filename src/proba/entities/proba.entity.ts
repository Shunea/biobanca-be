import { AnamnezaVietii } from 'src/anamneza-vietii/entities/anamneza-vietii.entity';
import { Barcode } from 'src/barcode/entities/barcode.entity';
import { StatutProba } from 'src/common/commonEnums';
import { CommonEntity } from 'src/common/entity/commonClass.entity';
import { Copii } from 'src/copii/entities/copii.entity';
import { Cutie } from 'src/cutie/entities/cutie.entity';
import { Donator } from 'src/donator/entities/donator.entity';
import { Frigider } from 'src/frigider/entities/frigider.entity';
import { Imsp } from 'src/imsp/entities/imsp.entity';
import { Parinte } from 'src/parinte/entities/parinte.entity';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Rude } from 'src/rude/entity/rude.entity';
import { User } from 'src/user/entities/user.entity';
import { Vaccin } from 'src/vaccin/entities/vaccin.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Proba extends CommonEntity {
  @Column({ type: 'date' })
  data_prelevarii: string;

  @Column({ type: 'date' })
  data_receptionare: string;

  @Column({ type: String })
  nume_proba: string;

  @Column({ type: Number })
  nr_proba: number;

  @Column({ type: String })
  tip_proba: string;

  @Column({ type: 'enum', enum: StatutProba, default: StatutProba.Asteptare })
  statutul_probei: string;

  @Column({ type: String, nullable: true })
  modificare_statut: string;

  @Column({ type: Date, nullable: true })
  modificare_statut_date: Date;

  @Column({ type: String })
  biospecimen_prelevat: string;

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

  @Column({ type: String })
  persoana_prelevarii: string;

  @Column({ type: String })
  persoana_receptionare: string;

  @Column({ type: String })
  sursa_provenienta_proba: string;


  @Column({ type: String })
  cod_si_diagnostic: string;

  @Column({ type: String })
  comorbiditati: string;

  @Column({ type: String })
  boli_autoimune: string;

  @Column({ type: String, nullable: true  })
  stare_generala: string;


  @Column({ type: String })
  anamneza_vietii_check: string;

  @OneToMany(() => AnamnezaVietii, (anamneza_vietii) => anamneza_vietii.proba, {
    cascade: true,
  })
  anamneza_vietii: AnamnezaVietii[];

  @Column({ type: String })
  vaccin_check: string;

  @OneToMany(() => Vaccin, (vaccin) => vaccin.proba, {
    cascade: true,
  })
  vaccin: Vaccin[];

  @Column({ type: String, nullable: true })
  TA: string;

  @Column({ type: Number, nullable: true })
  puls: number;

  @Column({ type: String, nullable: true })
  antecedentePersonaleFiziologice: string;

  @Column({ type: Number, nullable: true })
  perioada_maturizarii_sexuale: number;

  @Column({ type: Number, nullable: true })
  nr_sarcini: number;

  @Column({ type: Number, nullable: true })
  nr_nasteri: number;

  @Column({ type: Number, nullable: true })
  nr_avorturi: number;

  @Column({ type: Number, nullable: true })
  aparitia_perioadei_de_menopauza: number;

  @Column({ type: String })
  fumeaza: string;
  @Column({ type: Number, nullable: true })
  ce_cantitate_fumeaza: number;
  @Column({ type: Number, nullable: true })
  de_cati_ani_fumeaza: number;
  @Column({ type: Number, nullable: true })
  perioada_abstenenta_fumeaza: number;

  @Column({ type: String })
  consum_alcool: string;
  @Column({ type: Number, nullable: true })
  ce_cantitate_alcool: number;
  @Column({ type: Number, nullable: true })
  de_cati_ani_alcool: number;

  @Column({ type: String })
  subst_narc: string;
  @Column({ type: Number, nullable: true })
  ce_cantitate_narcotice: number;
  @Column({ type: Number, nullable: true })
  de_cati_ani_narcotice: number;
  @Column({ type: String, nullable: true })
  alte_deprinderi_daunatoare: string;

  @Column({ type: String })
  anamneza_alergologica_check: string;

  @Column({ type: String })
  anamneza_alergologica: string;

  @OneToMany(() => Parinte, (parinte) => parinte.proba, {
    cascade: true,
  })
  parinti: Parinte[];

  @OneToMany(() => Copii, (copii) => copii.proba, {
    cascade: true,
  })
  copii: Copii[];
  @OneToMany(() => Rude, (rude) => rude.proba, {
    cascade: true,
  })
  rude: Rude[];
  @Column({ type: String })
  relatii_in_familie: string;

  @Column({ type: String })
  venerice: string;
  @Column({ type: String })
  psiho_neurologice: string;
  @Column({ type: String })
  alergice: string;
  @Column({ type: String })
  endocrine: string;
  @Column({ type: String })
  boli_metabolice: string;
  @Column({ type: String })
  alcoolism: string;
  @Column({ type: String })
  neoplasme: string;
  @Column({ type: String })
  boli_hematopoetice: string;
  @Column({ type: String })
  lezarea_organelor: string;

  @Column({ type: Number, nullable: true })
  cantitate_proba: number;
  @Column({ type: String })
  unitate_masura: string;
  @Column({ type: Number })
  cantitate_unitate: number;
  @Column({ type: String })
  alicotata: string;
  @Column({ type: Number })
  nr_parti: number;
  @Column({ type: Number })
  rand: number;
  @Column({ type: Number })
  coloana: number;

  @Column({ type: String })
  tip_pastrare: string;

  @Column({ type: String })
  zona_pastrare: string;

  @ManyToOne(() => Cutie)
  @JoinColumn({ name: 'cutie_id' })
  cutie: Cutie;

  @Column({ type: String, default: null })
  cutie_id: string;

  @ManyToOne(() => Donator)
  @JoinColumn({ name: 'donator_id' })
  donator: Donator;

  @Column({ type: String, default: null })
  donator_id: string;

  @ManyToOne(() => Frigider)
  @JoinColumn({ name: 'frigider_id' })
  frigider: Frigider;

  @Column({ type: String, default: null })
  frigider_id: string;

  @Column({ type: String })
  IMSP: string;

  @ManyToOne(() => Imsp, (imsp) => imsp.probe)
  @JoinColumn({ name: 'imsp_id' })
  imsp: Imsp;

  @Column({ type: String, default: null })
  imsp_id: string;

  @ManyToOne(() => User, (user) => user.probe)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: String, default: null })
  user_id: string;

  @OneToMany(() => ProbaAlicotata, (probaAlicotata) => probaAlicotata.proba, {
    cascade: true,
  })
  probe_alicotate: ProbaAlicotata[];

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: String, default: null })
  project_id: string;

  @OneToMany(() => Barcode, (barcode) => barcode.proba, { cascade: true })
  public barcodes: Barcode[];
}
