import { StringifyOptions } from 'querystring';
import { Project } from 'src/projects/entities/project.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';

export type Option = {
  value: string;
  label: string;
};
export type FromToOption = {
  from: string;
  to: string;
};
export type ProiectFormular = {
    tip: Option[];
    denumire: string;
    data_inceput: FromToOption[];
    conducator: string;
    scopul: string;
    obiective: string;
    aprobare_comitet: string;
    data_finalizare: FromToOption[];
    rezumat: string;
} & Omit<
  Project,
  | 'tip'
  | 'denumire'
  | 'data_inceput'
  | 'conducator'
  | 'scopul'
  | 'obiective'
  | 'aprobare_comitet'
  | 'data_finalizare'
  | 'rezumat'
>;

export const transformToOption = (value: string, label?: string): Option => {
  return {
    value,
    label: label || value,
  };
};

export const filterProiect = (filter: Record<string, any>, key: string, value: any, qb: SelectQueryBuilder<Project>) => {
  if (Object.keys(filter).length === 0) {
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    qb.andWhere(`project.${key} = :${key}`, { [key]: value });
  }

  if (Array.isArray(value)) {
    if (value[0].hasOwnProperty("min")) {
      const { min, max } = value[0];
      if (key === "varsta_range") {
        qb.andWhere(`project.varsta BETWEEN :min AND :max`, { min, max });
      } else {
        qb.andWhere(`project.${key} BETWEEN :min AND :max`, { min, max });
      }
    } else if (value[0].hasOwnProperty("from")) {
      const { from, to } = value[0];
      qb.andWhere(`project.${key} BETWEEN :from AND :to`, { from, to });
    } else {
      qb.andWhere(`project.${key} IN (:...${key})`, { [key]: value });
    }
  }
};
