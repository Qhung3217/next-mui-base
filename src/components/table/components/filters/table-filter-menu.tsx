import type { Table } from '@tanstack/react-table';
import type { FilterType } from '../../types';

import { useBoolean } from 'minimal-shared/hooks';

import { Box, Badge, Stack, Drawer, Divider, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { FilterButton } from 'src/components/buttons';

import { FilterDateRangeSelect } from './filter-date';
import { FilterSelect, FilterMultiSelect } from './filter-select';

type Props<T> = {
  filterSlots: FilterType[];
  table: Table<T>;
};
export function TableFilterMenu<T>({ table, filterSlots }: Props<T>) {
  const filters = table.getState().globalFilter as Record<string, any>;
  const hasValue =
    !!filters && Object.values(filters).some((value) => !!value && value?.length !== 0);

  const open = useBoolean();

  const handleReset = () => {
    table.resetGlobalFilter();

    open.onFalse();
  };

  const handleUpdateFilter = (key: string, value: any) => {
    table.setGlobalFilter({
      ...table.getState().globalFilter,
      [key]: value,
    });
  };

  return (
    <Box>
      {/* <Button
        variant="outlined"
        size="small"
        sx={{
          borderColor: '#f5f5f5',
          // backgroundColor: 'transparent',
          color: '#333',
          minWidth: 'unset',
          aspectRatio: '1/1',
          height: 36,
          '&:hover': {
            opacity: 0.5,
          },

          ...(hasValue && {
            backgroundColor: 'primary.main',
            color: 'white',
            borderColor: 'primary.main',
            '&:hover': {
              opacity: 0.5,

              backgroundColor: 'primary.main',
            },
          }),
        }}
        onClick={open.onTrue}
      >
        <Badge color="secondary" variant="dot" invisible={!hasValue}>
          <Iconify
            icon={hasValue ? 'hugeicons:filter' : 'mingcute:filter-fill'}
            sx={{ color: hasValue ? 'white' : '#333' }}
          />
        </Badge>
      </Button> */}
      <Badge color="secondary" variant="dot" invisible={!hasValue}>
        <FilterButton
          onClick={open.onTrue}
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 1,
            width: 40,
            height: 40,
          }}
        />
      </Badge>

      <Drawer
        open={open.value}
        onClose={open.onFalse}
        anchor="right"
        PaperProps={{
          sx: {
            maxWidth: 300,
            width: 1,
            p: 2,
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="space-between">
          <Typography variant="h4"> Bộ lọc</Typography>
          <IconButton
            size="small"
            title="Đặt lại bộ lọc"
            disabled={!hasValue}
            onClick={handleReset}
            color="secondary"
          >
            <Iconify icon="lucide:funnel-x" />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1, mt: 0.5 }} />
        <Stack direction="column" spacing={2}>
          {filterSlots.map((filter) => {
            if (filter.type === 'date-range') {
              return (
                <FilterDateRangeSelect
                  key={filter.filterKey}
                  showValue
                  filter={filters ? filters[filter.filterKey] : null}
                  label={filter.label}
                  onChange={(filterValue) => {
                    handleUpdateFilter(filter.filterKey, filterValue);
                  }}
                />
              );
            }

            if (filter?.multiple)
              return (
                <FilterMultiSelect
                  key={filter.filterKey}
                  showValue
                  filters={filters ? filters[filter.filterKey] : []}
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
                showValue
                filter={filters ? filters[filter.filterKey] : ''}
                label={filter.label}
                onChange={(filterValue) => {
                  handleUpdateFilter(filter.filterKey, filterValue);
                }}
                options={filter.options}
              />
            );
          })}
        </Stack>
      </Drawer>
    </Box>
  );
}
