'use client';

import type { DateRange } from '../../types';

import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import { Box, Badge, Stack, Button, Popover, Divider, Typography } from '@mui/material';

import { fIsAfter, fDateRangeShortLabel } from 'src/utils';

import { Iconify } from 'src/components/iconify';
import { DateRangeBox } from 'src/components/date-range-box';

import { FilterButton } from './filter-button';

type FilterDateRangeProps = {
  label: string;
  filter: DateRange;
  onChange: (filterValue: DateRange) => void;
  showValue?: boolean;
};

export function FilterDateRangeSelect({
  filter,
  label,
  onChange,
  showValue,
}: FilterDateRangeProps) {
  const [localFilters, setLocalFilters] = useState<{ from: string | null; to: string | null }>({
    from: null,
    to: null,
  });

  const hasValue = !!filter && !!filter.from && !!filter.to;

  const isInValid =
    localFilters.from && localFilters.to ? fIsAfter(localFilters.from, localFilters.to) : false;

  const popover = usePopover();

  const setLocalFiltersValue = useCallback(() => {
    if (popover.open) {
      setLocalFilters(filter ? filter : { from: null, to: null });
    }
  }, [filter, popover.open]);

  const handleChange = (key: string, value: any) => {
    setLocalFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      return newFilters;
    });
  };
  const handleReset = () => {
    onChange(null);
    handleClose();
  };

  const handleFilter = () => {
    onChange(
      localFilters.from && localFilters.to ? { from: localFilters.from, to: localFilters.to } : null
    );
    handleClose();
  };

  const handleClose = () => {
    popover.onClose();
  };

  const renderPopover = () => (
    <Popover
      open={popover.open}
      onClose={handleClose}
      anchorEl={popover.anchorEl}
      ref={setLocalFiltersValue}
      closeAfterTransition
      transitionDuration={{
        exit: 0,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          sx: {
            ...(showValue && { maxWidth: popover.anchorEl?.offsetWidth }),
          },
        },
      }}
    >
      <DateRangeBox
        from={{
          value: localFilters?.from ? dayjs(localFilters.from) : null,
          onChange: (newDate) => handleChange('from', newDate ? newDate.toISOString() : null),
        }}
        to={{
          value: localFilters?.to ? dayjs(localFilters.to) : null,
          onChange: (newDate) => handleChange('to', newDate ? newDate.toISOString() : null),
        }}
        sx={{ my: 0.5 }}
      />

      <Divider />

      <Stack direction="row" spacing={0.5} sx={{ pt: 0.5 }}>
        <Button
          size="small"
          sx={{ typography: 'caption', flexShrink: 0, minWidth: 'unset' }}
          variant="outlined"
          onClick={handleReset}
          title="Xóa tiêu chí lọc"
        >
          <Iconify icon="grommet-icons:clear" width={15} sx={{ color: 'error.main' }} />
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleFilter}
          size="small"
          sx={{ flex: 1 }}
          disabled={!localFilters.from || !localFilters.to || isInValid}
        >
          Lọc{' '}
          {localFilters.from && localFilters.to
            ? fDateRangeShortLabel(localFilters.from, localFilters.to)
            : ''}
        </Button>
      </Stack>
    </Popover>
  );

  if (showValue)
    return (
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>

        <FilterButton
          onClick={popover.onOpen}
          hasValue={hasValue}
          fullWidth
          endIcon={null}
          onClear={handleReset}
          sx={{
            width: 1,
          }}
        >
          {hasValue ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 0.2,
                position: 'relative',
                pl: 3,
              }}
            >
              <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                {fDateRangeShortLabel(filter.from, filter.to)}
              </Typography>
            </Box>
          ) : (
            'Từ ngày - Đến ngày'
          )}
        </FilterButton>
        {renderPopover()}
      </Box>
    );

  return (
    <Box>
      <Badge
        color="secondary"
        variant="dot"
        invisible={!hasValue}
        sx={{
          '& .MuiBadge-dot': {
            top: '8px',
            right: '8px',
          },
        }}
      >
        <FilterButton
          onClick={popover.onOpen}
          hasValue={hasValue}
          endIcon={null}
          onClear={handleReset}
        >
          {hasValue ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 0.2,
                position: 'relative',
              }}
            >
              <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                {fDateRangeShortLabel(filter.from, filter.to)}
              </Typography>
            </Box>
          ) : (
            label
          )}
        </FilterButton>
      </Badge>
      {renderPopover()}
    </Box>
  );
}
