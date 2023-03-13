import { QBFilterQuery } from '@mikro-orm/core';
import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { DefaultQueryDto } from '../dto';

export const generateFulltextSearch = <T extends object>(
  qb: QueryBuilder<T>,
  keyword: string,
  cols: string[],
): QueryBuilder<T> => {
  if (!keyword) return qb;
  return qb.andWhere(
    `match(${cols.join(',')}) against('${keyword}' in natural language mode)`,
  );
};

export const generateDefaultQuery = <T extends object>(
  qb: QueryBuilder<T>,
  query: DefaultQueryDto,
): QueryBuilder<T> => {
  const { limit, offset, orderBy } = query;

  return qb.limit(limit).offset(offset).orderBy(orderBy);
};

export const generateFindAllQuery = <T extends object>(
  qb: QueryBuilder<T>,
  query: DefaultQueryDto,
  keyword?: string,
  fulltextColumns?: string[],
  filter?: QBFilterQuery<T>,
): QueryBuilder<T> => {
  qb = generateDefaultQuery(qb, query);
  qb = generateFulltextSearch(qb, keyword, fulltextColumns);
  return qb.andWhere(filter);
};

export const generateFindAllWithoutOrder = <T extends object>(
  qb: QueryBuilder<T>,
  query: DefaultQueryDto,
  keyword?: string,
  fulltextColumns?: string[],
  filter?: QBFilterQuery<T>,
): QueryBuilder<T> => {
  const { limit, offset } = query;

  qb = qb.limit(limit).offset(offset);
  qb = generateFulltextSearch(qb, keyword, fulltextColumns);
  return qb.andWhere(filter);
};

export const getResultAndPaginate = async <T extends object>(
  qb: QueryBuilder<T>,
  populator?: EntityRepository<T>,
  relationship?: any[],
) => {
  const count = await qb.getCount();
  const rows = await qb.getResult();
  await populator?.populate(rows, relationship ? relationship : true);
  return [rows, count] as const;
};

export const getResultQueryAndPaginate = async <T extends object>(
  qb: QueryBuilder<T>,
) => {
  const count = await qb.getCount();
  const rows = await qb.execute();
  return [rows, count] as const;
};

export const getResultQueryAndWithoutPaginate = async <T extends object>(
  qb: QueryBuilder<T>,
) => {
  const rows = await qb.execute();
  return rows;
};
