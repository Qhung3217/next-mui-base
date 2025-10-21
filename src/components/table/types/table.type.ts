import type { Table, TableOptions } from '@tanstack/react-table';

export type TableMetaCustom = {
  loading?: boolean;
};

export type TanTable<T> = Omit<Table<T>, 'options'> & {
  options: Pick<Table<T>, 'options'> & {
    meta: TableMetaCustom;
  };
};

export type TanTableOptions<T> = Omit<TableOptions<T>, 'meta'> & { meta: TableMetaCustom };
