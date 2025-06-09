import { Proba } from 'src/proba/entities/proba.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';

export type Option = {
  value: string;
  label: string;
};
export type FromToOption = {
  from: string;
  to: string;
};
export type ProbaFormular = {
  IDNP?: Option[];
  prenume?: Option[];
  nume?: Option[];
  patronimicul?: Option[];
  sex?: Option[];
  varsta?: Option[];
  varsta_range?: { min: number; max: number }[];
  data_nasterii?: FromToOption[];
  loc_de_trai?: Option[];
  statut?: Option[];
  inaltime?: Option[];
  lucreaza?: Option[];
  profesie_specializare?: Option[];
  greutate?: Option[];
  casatorit?: Option[];
  grupa_sangvina?: Option[];
  rh?: Option[];
  loc_de_munca?: Option[];
  cetatenie?: Option[];
  etnie?: Option[];
  rp_mn?: Option[];
  rp_localitate?: Option[];
  rp_strada?: Option[];

  IMSP?: Option[];
  cod_si_diagnostic?: Option[];
  boli_autoimune?: Option[];
  comorbiditati?: Option[];
  comorbiditati_range?: FromToOption[];
  stare_generala?: Option[];
  perioada_maturizarii_sexuale?: Option[];
  nr_sarcini?: Option[];
  nr_nasteri?: Option[];
  nr_avorturi?: Option[];
  aparitia_perioadei_de_menopauza?: Option[];

  fumeaza?: Option[];
  ce_cantitate_fumeaza?: Option[];
  de_cati_ani_fumeaza?: Option[];
  perioada_abstenenta_fumeaza?: Option[];

  consum_alcool?: Option[];
  ce_cantitate_alcool?: Option[];
  de_cati_ani_alcool?: Option[];

  subst_narc?: Option[];
  ce_cantitate_narcotice?: Option[];
  de_cati_ani_narcotice?: Option[];

  alte_deprinderi_daunatoare?: Option[];

  anamneza_alergologica?: Option[];

  parinti?: Option[];
  copii?: Option[];
  rude?: Option[];
  relatii_in_familie?: Option[];

  venerice?: Option[];
  psiho_neurologice?: Option[];
  alergice?: Option[];
  endocrine?: Option[];
  boli_metabolice?: Option[];
  alcoolism?: Option[];
  neoplasme?: Option[];
  boli_hematopoetice?: Option[];
  lezarea_organelor?: Option[];
  TA?: Option[];
  puls?: Option[];
  nr_proba?: Option[];
  tip_proba?: Option[];
  biospecimen_prelevat?: Option[];
  persoana_prelevarii?: Option[];
  data_prelevarii?: FromToOption[];
  data_receptionare?: FromToOption[];
  persoana_receptionarii?: string;
  sursa_provenienta_proba?: string;

  cantitate_proba?: Option[];
  unitate_masura?: Option[];

  cantitate_unitate?: Option[];
  alicotata?: Option[];
  nr_parti?: Option[];

  nr_cutie?: Option[];
  tip_cutie?: Option[];
  cutie_randuri?: Option[];
  cutie_coloane?: Option[];

  frigider?: Option[];
  frigider_randuri?: Option[];
  frigider_coloane?: Option[];
  zona_probei?: Option[];

  proba_alicotata?: Option[];
  proiect_tip?: Option[];
  proiect_denumire?: Option[];
  proiect_conducator?: Option[];
} & Omit<
  Proba,
  | 'IDNP'
  | 'prenume'
  | 'nume'
  | 'patronimicul'
  | 'sex'
  | 'varsta'
  | 'varsta_range'
  | 'data_nasterii'
  | 'loc_de_trai'
  | 'statut'
  | 'inaltime'
  | 'lucreaza'
  | 'profesie_specializare'
  | 'greutate'
  | 'casatorit'
  | 'grupa_sangvina'
  | 'rh'
  | 'loc_de_munca'
  | 'cetatenie'
  | 'etnie'
  | 'rp_mn'
  | 'rp_localitate'
  | 'rp_strada'
  | 'IMSP'
  | 'persoana_receptionarii'
  | 'sursa_provenienta_proba'
  | 'cod_si_diagnostic'
  | 'boli_autoimune'
  | 'comorbiditati'
  | 'comorbiditati_range'
  | 'stare_generala'
  | 'perioada_maturizarii_sexuale'
  | 'nr_sarcini'
  | 'nr_nasteri'
  | 'nr_avorturi'
  | 'aparitia_perioadei_de_menopauza'
  | 'fumeaza'
  | 'ce_cantitate_fumeaza'
  | 'de_cati_ani_fumeaza'
  | 'perioada_abstenenta_fumeaza'
  | 'consum_alcool'
  | 'ce_cantitate_alcool'
  | 'de_cati_ani_alcool'
  | 'subst_narc'
  | 'ce_cantitate_narcotice'
  | 'de_cati_ani_narcotice'
  | 'alte_deprinderi_daunatoare'
  | 'anamneza_alergologica'
  | 'parinti'
  | 'copii'
  | 'rude'
  | 'relatii_in_familie'
  | 'venerice'
  | 'psiho_neurologice'
  | 'alergice'
  | 'endocrine'
  | 'boli_metabolice'
  | 'alcoolism'
  | 'neoplasme'
  | 'boli_hematopoetice'
  | 'lezarea_organelor'
  | 'TA'
  | 'puls'
  |'nr_proba'
  |'tip_proba'
  |'biospecimen_prelevat'
  |'persoana_prelevarii'
  |'data_prelevarii'
  |'data_receptionare'
  |'cantitate_proba'
  |'unitate_masura'
  |'cantitate_unitate'
  |'alicotata'
  |'nr_parti'
  |'nr_cutie'
  |'tip_cutie'
  |'cutie_randuri'
  |'cutie_coloane'
  |'frigider'
  |'frigider_randuri'
  |'frigider_coloane'
  |'zona_probei'
  |'proba_alicotata'
  |'proiect_tip'
  |'proiect_denumire'
  |'proiect_conducator'
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

export const formatProba = (proba: Proba) => {
  const IMSP = proba.IMSP;
  const prenume = proba.donator.prenume;
  const IDNP = proba.donator.IDNP;
  const nume = proba.donator.nume;
  const patronimicul = proba.donator.patronimicul;
  const sex = proba.donator.sex;
  const loc_de_trai = proba.donator.loc_de_trai;
  const statut = proba.donator.statut;
  const inaltime = proba.donator.inaltime;
  const lucreaza = proba.donator.lucreaza;
  const profesie_specializare = proba.donator.profesie_specializare;
  const greutate = proba.donator.greutate;
  const casatorit = proba.donator.casatorit;
  const grupa_sangvina = proba.donator.grupa_sangvina;
  const rh = proba.donator.rh;
  const loc_de_munca = proba.donator.loc_de_munca;
  const cetatenie = proba.donator.cetatenie;
  const etnie = proba.donator.etnie;
  const rp_mn = proba.donator.rp_mn;
  const rp_localitate = proba.donator.rp_localitate;
  const rp_strada = proba.donator.rp_strada;
  const varsta = proba.donator.varsta;
  const cod_si_diagnostic = proba.cod_si_diagnostic;
  const boli_autoimune = proba.boli_autoimune;
  const comorbiditati = proba.comorbiditati;
  const stare_generala = proba.stare_generala;
  const perioada_maturizarii_sexuale = proba.perioada_maturizarii_sexuale;
  const nr_sarcini = proba.nr_sarcini;
  const nr_nasteri = proba.nr_nasteri;
  const nr_avorturi = proba.nr_avorturi
  const aparitia_perioadei_de_menopauza = proba.aparitia_perioadei_de_menopauza;
  const fumeaza = proba.fumeaza;
  const ce_cantitate_fumeaza = proba.ce_cantitate_fumeaza;
  const de_cati_ani_fumeaza = proba.de_cati_ani_fumeaza;
  const perioada_abstenenta_fumeaza = proba.perioada_abstenenta_fumeaza;
  const consum_alcool = proba.consum_alcool;
  const ce_cantitate_alcool = proba.ce_cantitate_alcool;
  const de_cati_ani_alcool = proba.de_cati_ani_alcool;
  const subst_narc = proba.subst_narc;
  const ce_cantitate_narcotice = proba.ce_cantitate_narcotice;
  const de_cati_ani_narcotice = proba.de_cati_ani_narcotice;
  const alte_deprinderi_daunatoare = proba.alte_deprinderi_daunatoare;
  const anamneza_alergologica = proba.anamneza_alergologica;
  const parinti = proba.parinti;
  const copii = proba.copii;
  const rude = proba.rude;
  const relatii_in_familie = proba.relatii_in_familie;
  const venerice = proba.venerice;
  const psiho_neurologice = proba.psiho_neurologice
  const alergice = proba.alergice;
  const endocrine = proba.endocrine;
  const boli_metabolice = proba.boli_metabolice;
  const alcoolism = proba.alcoolism;
  const neoplasme = proba.neoplasme;
  const boli_hematopoetice = proba.boli_hematopoetice;
  const lezarea_organelor = proba.lezarea_organelor;
  const TA = proba.TA;
  const puls = proba.puls;
  const nr_proba = proba.nr_proba
  const tip_proba = proba.tip_proba
  const biospecimen_prelevat = proba.biospecimen_prelevat
  const persoana_prelevarii = proba.persoana_prelevarii
  const data_prelevarii = proba.data_prelevarii
  const data_receptionare = proba.data_receptionare
  const persoana_receptionarii = proba.persoana_receptionare
  const sursa_provenienta_proba = proba.sursa_provenienta_proba
  const cantitate_proba = proba.cantitate_proba
  const unitate_masura = proba.unitate_masura
  const cantitate_unitate = proba.cantitate_proba
  const alicotata = proba.alicotata
  const nr_parti = proba.nr_parti
  const nr_cutie = proba.cutie.nr_cutie
  const tip_cutie = proba.cutie.tip_cutie
  const cutie_randuri = proba.cutie.randuri
  const cutie_coloane = proba.cutie.coloane
  const frigider = proba.frigider
  const frigider_randuri = proba.frigider.randuri
  const frigider_coloane = proba.frigider.coloane
  const zona_probei = proba.frigider.zona_probei
  const proba_alicotata = proba.probe_alicotate
  const proiect_tip = proba.project.tip
  const proiect_denumire = proba.project.denumire
  const proiect_conducator = proba.project.conducator

  let anul_nasterii = 0;

  if (varsta !== 0) {
    anul_nasterii = new Date().getFullYear() - varsta;
  }
};

export const filterProba = (filter: any, key: string, value: any, qb: SelectQueryBuilder<Proba>, statistics?: boolean) => {
  if (Object.keys(filter).length === 0) {
    return;
  }

  let entityAlias = '';
  
  if (key.includes("donator_")) {
    key = key.replace("donator_", "");
    entityAlias = 'donator';
  } else if (key.includes("proiect_")) {
    key = key.replace("proiect_", "");
    entityAlias = 'project';
  } else if (key.includes("cutie_")) {
    key = key.replace("cutie_", "");
    entityAlias = 'cutie';
  } else if (key.includes("frigider_")) {
    key = key.replace("frigider_", "");
    entityAlias = 'frigider';
  } else if (key.includes("proba_")) {
    key = key.replace("proba_", "");
    entityAlias = 'proba';
  }

  if (statistics) {
    qb.addSelect(key).addSelect('COUNT(*) as total');
    qb.addGroupBy(key);
  }
  
  if (typeof value === 'string' || typeof value === 'number') {
    qb.andWhere(`${entityAlias}.${key} = :${key}`, { [key]: value });
  }

  if (Array.isArray(value)) {
    if (value[0].hasOwnProperty("min")) {
      const { min, max } = value[0];

      if (key === "varsta_range") {
        qb.andWhere(`${entityAlias}.varsta BETWEEN :min AND :max`, { min, max });
      } else {
        qb.andWhere(`${entityAlias}.${key} BETWEEN :min AND :max`, { min, max });
      }
    } else if (value[0].hasOwnProperty("from")) {
      const { from, to } = value[0];

      if (key === 'comorbiditati_range') {
        const { from, to } = value[0];
        
        if (filter["comorbiditati"]) {
          qb.andWhere(`${entityAlias}.comorbiditati (BETWEEN :from AND :to) OR donator.comorbiditati IN (:...${key})`, {
            from,
            to,
            [key]: filter["comorbiditati"],
          });
        } else {
          qb.andWhere(`${entityAlias}.comorbiditati BETWEEN :from AND :to`, { from, to });
        }
      } else {
        qb.andWhere(`${entityAlias}.${key} BETWEEN :from AND :to`, { from, to });
      }
    }  else {
      qb.andWhere(`${entityAlias}.${key} IN (:...${key})`, { [key]: value });
    }
  }
};