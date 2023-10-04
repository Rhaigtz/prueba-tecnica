import { Brackets, SelectQueryBuilder } from 'typeorm';

export interface ISearchQueryBuilder {
  entityName: string;
  columnName: string;
  isStringColumn?: boolean;
  isNumberColumn?: boolean;
  executeSearch?: boolean;
  omitMap?: boolean;
}

const searchBuilder = (
  query: SelectQueryBuilder<any>,
  search: string,
  columns: ISearchQueryBuilder[],
): SelectQueryBuilder<any> => {
  query.andWhere(
    new Brackets((qb) => {
      columns.forEach((column) => {
        if (!column.executeSearch) {
          return;
        }
        if (column.isStringColumn) {
          qb.orWhere(
            `UPPER(${column.entityName}.${column.columnName}) like :search`,
            {
              search: `%${search.toUpperCase()}%`,
            },
          );
        }
        if (column.isNumberColumn && Number(search.toUpperCase())) {
          qb.orWhere(`${column.entityName}.${column.columnName} = :search`, {
            search: `${Number(search.toUpperCase())}`,
          });
        }
      });
    }),
  );

  return query;
};

export default searchBuilder;
