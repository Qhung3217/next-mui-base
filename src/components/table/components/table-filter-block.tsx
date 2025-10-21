'use client';

import type { Table } from '@tanstack/react-table';
import type { FilterType } from '../types';

import { useMemo } from 'react';

import { Stack, Divider, useTheme, useMediaQuery } from '@mui/material';

import { FilterSelect, FilterMultiSelect } from './filters/filter-select';
import { TableSearch, TableFilterMenu, FilterDateRangeSelect } from './filters';

type Props<T> = {
  table: Table<T>;
  slots?: FilterType[];
};
export default function TableFilterBlock<T>({ table, slots }: Props<T>) {
  const globalFilters = table.getState().globalFilter as Record<string, any>;

  const theme = useTheme();

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const filtersRender = useMemo(() => {
    const result: {
      menu: any[];
      outside: any[];
    } = {
      menu: [],
      outside: [],
    };
    if (!slots) return result;
    if (!mdUp) {
      result.menu = [...slots];
    } else {
      slots.forEach((filter) => {
        if (filter?.inMenu) {
          result.menu.push(filter);
        } else {
          result.outside.push(filter);
        }
      });
    }

    return result;
  }, [slots, mdUp]);

  const handleChangeKeyword = (word: string) => {
    table.setGlobalFilter({
      ...table.getState().globalFilter,
      keyword: word,
    });
  };

  const handleUpdateFilter = (key: string, value: any) => {
    table.setGlobalFilter({
      ...table.getState().globalFilter,
      [key]: value,
    });
  };

  return (
    <Stack
      direction="row"
      // justifyContent="space-between"
      alignItems="center"
      spacing={1}
      divider={<Divider flexItem orientation="vertical" />}
    >
      <TableSearch onChange={handleChangeKeyword} />
      {(!!filtersRender.menu.length || !!filtersRender.outside.length) && (
        <Stack direction="row" spacing={1}>
          {filtersRender.outside.map((filter) => {
            if (filter.type === 'date-range')
              return (
                <FilterDateRangeSelect
                  key={filter.filterKey}
                  filter={globalFilters ? globalFilters[filter.filterKey] : null}
                  label={filter.label}
                  onChange={(filterValue) => {
                    handleUpdateFilter(filter.filterKey, filterValue);
                  }}
                />
              );

            if (filter?.multiple)
              return (
                <FilterMultiSelect
                  key={filter.filterKey}
                  filters={globalFilters ? globalFilters[filter.filterKey] : []}
                  options={filter.options}
                  label={filter.label}
                  onChange={(filterValue) => {
                    handleUpdateFilter(filter.filterKey, filterValue);
                  }}
                />
              );

            return (
              <FilterSelect
                key={filter.filterKey}
                filter={globalFilters ? globalFilters[filter.filterKey] : ''}
                label={filter.label}
                onChange={(filterValue) => {
                  handleUpdateFilter(filter.filterKey, filterValue);
                }}
                options={filter.options}
              />
            );
          })}

          {!!filtersRender.menu.length && (
            <TableFilterMenu table={table} filterSlots={filtersRender.menu} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
