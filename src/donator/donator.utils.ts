import { Donator } from 'src/donator/entities/donator.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';

export type Option = {
  value: string;
  label: string;
};
export type FromToOption = {
  from: string;
  to: string;
};
export type DonatorFormular = {
  IDNP?: Option[];
  nume?: Option[];
  prenume?: Option[];
  patronimicul?: Option[];
  sex?: Option[];
  varsta?: Option[];
  varsta_range?: { min: number; max: number }[];
  data_nasterii?: FromToOption[];
  loc_de_trai?: Option[];
  statut?: Option[];
  inaltime?: Option[];
  greutate?: Option[];
  casatorit?: Option[];
  rh?: Option[];
  grupa_sangvina?: Option[];
  loc_de_munca?: Option[];
  cetatenie?: Option[];
  etnie?: Option[];
  rp_mn?: Option[];
  rp_localitate?: Option[];
  rp_strada?: Option[];
  lucreaza?: string;
  profesie_specializare?: Option[];

  // IMSP?: Option[];
  // nr_proba?: Option[];
  // tip_proba?: Option[];
  // biospecimen_prelevat?: Option[];
  // persoana_prelevarii?: Option[];
  // data_prelevarii?: FromToOption[];
  // data_receptionare?: FromToOption[];
  // persoana_receptionarii?: Option[];
  // sursa_provenienta_proba?: Option[];
  // cod_si_diagnostic?: Option[];
  // boli_autoimune?: Option[];
  // comorbiditati?: Option[];
  // comorbiditati_range?: FromToOption[];
  // stare_generala?: Option[];
  // perioada_maturizarii_sexuale?: Option[];
  // nr_sarcini?: Option[];
  // nr_nasteri?: Option[];
  // nr_avorturi?: Option[];
  // aparitia_perioadei_de_menopauza?: Option[];

  // fumeaza?: Option[];
  // ce_cantitate_fumeaza?: Option[];
  // de_cati_ani_fumeaza?: Option[];
  // perioada_abstenenta_fumeaza?: Option[];

  // consum_alcool?: Option[];
  // ce_cantitate_alcool?: Option[];
  // de_cati_ani_alcool?: Option[];

  // subst_narc?: Option[];
  // ce_cantitate_narcotice?: Option[];
  // de_cati_ani_narcotice?: Option[];

  // alte_deprinderi_daunatoare?: Option[];

  // anamneza_alergologica?: Option[];

  // parinti?: Option[];
  // copii?: Option[];
  // rude?: Option[];
  // relatii_in_familie?: Option[];

  // venerice?: Option[];
  // psiho_neurologice?: Option[];
  // alergice?: Option[];
  // endocrine?: Option[];
  // boli_metabolice?: Option[];
  // alcoolism?: Option[];
  // neoplasme?: Option[];
  // boli_hematopoetice?: Option[];
  // lezarea_organelor?: Option[];
  // TA?: Option[];
  // puls?: Option[];
} & Omit<
  Donator,
  | 'IDNP'
  | 'nume'
  | 'prenume'
  | 'patronimicul'
  | 'sex'
  | 'varsta'
  | 'varsta_range'
  | 'data_nasterii'
  | 'loc_de_trai'
  | 'statut'
  | 'inaltime'
  | 'greutate'
  | 'casatorit'
  | 'rh'
  | 'grupa_sangvina'
  | 'cetatenie'
  | 'etnie'
  | 'rp_mn'
  | 'rp_localitate'
  | 'rp_strada'
  | 'lucreaza'
  | 'profesie_specializare'
  | 'loc_de_munca'
  // | 'IMSP'
  // | 'nr_proba'
  // | 'tip_proba'
  // | 'biospecimen_prelevat'
  // | 'persoana_prelevarii'
  // | 'data_prelevarii'
  // | 'data_receptionare'
  // | 'persoana_receptionarii'
  // | 'sursa_provenienta_proba'
  // | 'cod_si_diagnostic'
  // | 'boli_autoimune'
  // | 'comorbiditati'
  // | 'comorbiditati_range'
  // | 'stare_generala'
  // | 'perioada_maturizarii_sexuale'
  // | 'nr_sarcini'
  // | 'nr_nasteri'
  // | 'nr_avorturi'
  // | 'aparitia_perioadei_de_menopauza'
  // | 'fumeaza'
  // | 'ce_cantitate_fumeaza'
  // | 'de_cati_ani_fumeaza'
  // | 'perioada_abstenenta_fumeaza'
  // | 'consum_alcool'
  // | 'ce_cantitate_alcool'
  // | 'de_cati_ani_alcool'
  // | 'subst_narc'
  // | 'ce_cantitate_narcotice'
  // | 'de_cati_ani_narcotice'
  // | 'alte_deprinderi_daunatoare'
  // | 'anamneza_alergologica'
  // | 'parinti'
  // | 'copii'
  // | 'rude'
  // | 'relatii_in_familie'
  // | 'venerice'
  // | 'psiho_neurologice'
  // | 'alergice'
  // | 'endocrine'
  // | 'boli_metabolice'
  // | 'alcoolism'
  // | 'neoplasme'
  // | 'boli_hematopoetice'
  // | 'lezarea_organelor'
  // | 'TA'
  // | 'puls'
>;

export const covidOptions = [
  {
    value: 'Da',
    label: 'Da',
  },
  {
    value: 'Nu',
    label: 'Nu',
  },
  {
    value: 'Nu cunosc',
    label: 'Nu cunosc',
  },
];

export const transformToOption = (value: string, label?: string): Option => {
  return {
    value,
    label: label || value,
  };
};

export const formatDonator = (donator: Donator) => {
  const IDNP = donator.IDNP;
  const nume = donator.nume;
  const prenume = donator.prenume;
  const patronimicul = donator.patronimicul;
  const sex = donator.sex;
  const varsta = donator.varsta;
  const loc_de_trai = donator.loc_de_trai;
  const statut = donator.statut;
  const inaltime = donator.inaltime;
  const greutate = donator.greutate;
  const casatorit = donator.casatorit;
  const rh = donator.rh;
  const grupa_sangvina = donator.grupa_sangvina;
  const lucreaza = donator.lucreaza;
  // let lucreaza_donator ='';
  // if(lucreaza ! == 0 ){
  //   lucreaza_donator = 'Da';
  // } else {
  //   lucreaza_donator= 'Nu';
  // }
  const profesie_specializare = donator.profesie_specializare;
  const loc_de_munca = donator.loc_de_munca;
  const cetatenie = donator.cetatenie;
  const etnie = donator.etnie;
  const rp_mn = donator.rp_mn;
  const rp_localitate = donator.rp_localitate;
  const rp_strada = donator.rp_strada;

  let anul_nasterii = 0;

  if (varsta !== 0) {
    anul_nasterii = new Date().getFullYear() - varsta;
  }

};

export const filterDonator = (filter: Record<string, any>, key: string, value: any, qb: SelectQueryBuilder<Donator>) => {
  if (Object.keys(filter).length === 0) {
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    qb.andWhere(`donator.${key} = :${key}`, { [key]: value });
  }

  if (Array.isArray(value)) {
    if (value[0].hasOwnProperty("min")) {
      const { min, max } = value[0];
      if (key === "varsta_range") {
        qb.andWhere(`donator.varsta BETWEEN :min AND :max`, { min, max });
      } else {
        qb.andWhere(`donator.${key} BETWEEN :min AND :max`, { min, max });
      }
    } else if (value[0].hasOwnProperty("from")) {
      const { from, to } = value[0];
      qb.andWhere(`donator.${key} BETWEEN :from AND :to`, { from, to });
    } else {
      qb.andWhere(`donator.${key} IN (:...${key})`, { [key]: value });
    }
  }
};
