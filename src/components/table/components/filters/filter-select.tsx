'use client';

import type { FilterSelectMulti, FilterSelectSingle } from '../../types';

import { useState, useCallback } from 'react';
import { pxToRem } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import {
  Box,
  Menu,
  Badge,
  Stack,
  Button,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { FilterButton } from './filter-button';

/* ----------------------------------------- */

type BaseFilterSelectProps = {
  showValue?: boolean;
};

/* ----------------------------------------- */

const ITEM_HEIGHT = 40;

// MARK: Select single
/* -------------------------------------------- */
/*                 SELECT SINGLE                */
/* -------------------------------------------- */
type FilterSelectProps = BaseFilterSelectProps &
  Omit<FilterSelectSingle, 'type' | 'filterKey' | 'multiple'> & {
    filter: string;
    onChange: (filterValue: string) => void;
  };
export function FilterSelect({ filter, label, onChange, options, showValue }: FilterSelectProps) {
  const hasValue = !!filter;

  const popover = usePopover();

  const handleChange = (value: string) => {
    onChange(value);
    handleClose();
  };

  const handleReset = () => {
    handleChange('');
  };

  const handleClose = () => {
    popover.onClose();
  };

  const renderMenu = () => (
    <Menu
      open={popover.open}
      onClose={handleClose}
      anchorEl={popover.anchorEl}
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
            maxWidth: 300,
            minWidth: popover.anchorEl?.offsetWidth,
            width: '50%',
            ...(showValue && { maxWidth: popover.anchorEl?.offsetWidth, width: 1 }),
          },
        },
      }}
    >
      {(options || []).map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          onClick={() => {
            handleChange(option.value);
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
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
          onClear={handleReset}
          sx={{ width: 1 }}
        >
          {hasValue ? (
            <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {options.find((option) => option.value === filter)?.label}
            </Typography>
          ) : (
            `Chọn ${label.toLowerCase()}`
          )}
        </FilterButton>

        {renderMenu()}
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
        <FilterButton onClick={popover.onOpen} hasValue={hasValue} onClear={handleReset}>
          {hasValue ? (
            <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {options.find((option) => option.value === filter)?.label}
            </Typography>
          ) : (
            label
          )}
        </FilterButton>
      </Badge>
      {renderMenu()}
    </Box>
  );
}

// MARK: Select multi
/* -------------------------------------------- */
/*                 SELECT MULTI                 */
/* -------------------------------------------- */
type FilterMultiSelectProps = BaseFilterSelectProps &
  Omit<FilterSelectMulti, 'type' | 'filterKey' | 'multiple'> & {
    filters: string[];
    onChange: (filterValue: string[]) => void;
  };

export function FilterMultiSelect({
  filters,
  label,
  onChange,
  options,
  showValue,
}: FilterMultiSelectProps) {
  const [localFilters, setLocalFilters] = useState<string[]>([]);

  const hasValue = !!filters.length;

  const popover = usePopover();

  const setLocalFiltersValue = useCallback(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (value: string) => {
    const index = localFilters.findIndex((lf) => lf === value);

    if (index !== -1) {
      setLocalFilters((prev) => {
        const newFilters = [...prev];
        newFilters.splice(index, 1);
        return newFilters;
      });
    } else {
      setLocalFilters((prev) => [...prev, value]);
    }
  };

  const handleRemove = (value: string) => {
    const index = localFilters.findIndex((lf) => lf === value);

    if (index !== -1) {
      setLocalFilters((prev) => {
        const newFilters = [...prev];
        newFilters.splice(index, 1);
        onChange(newFilters);

        return newFilters;
      });
    }
  };

  const handleClose = () => {
    popover.onClose();
  };
  const handleFilter = () => {
    onChange(localFilters);
    handleClose();
  };

  const handleClearFilter = () => {
    onChange([]);
    handleClose();
  };

  const renderMenu = () => (
    <Menu
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
            maxWidth: 300,
            minWidth: popover.anchorEl?.offsetWidth,
            width: '50%',
            ...(showValue && { maxWidth: popover.anchorEl?.offsetWidth, width: 1 }),
          },
        },
      }}
    >
      <Scrollbar sx={{ maxHeight: ITEM_HEIGHT * 5 }}>
        {options.map((option) => {
          const isSelected = localFilters.some((localFilter) => option.value === localFilter);

          return (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => {
                handleChange(option.value);
              }}
            >
              <Iconify
                icon="material-symbols:check-rounded"
                sx={{ visibility: isSelected ? 'visible' : 'hidden', color: 'info.main' }}
              />
              {option.label}
            </MenuItem>
          );
        })}
      </Scrollbar>

      <Divider sx={{ mt: 0.5 }} />

      <Stack direction="row" spacing={0.5} sx={{ pt: 0.5 }}>
        <Button
          size="small"
          sx={{ typography: 'caption', flexShrink: 0, minWidth: 'unset' }}
          variant="outlined"
          onClick={handleClearFilter}
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
          disabled={!localFilters.length}
        >
          Lọc {localFilters.length ? `${localFilters.length} tiêu chí` : ''}
        </Button>
      </Stack>
    </Menu>
  );

  if (showValue)
    return (
      <Box sx={{}}>
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>

        <FilterButton
          onClick={popover.onOpen}
          hasValue={hasValue}
          fullWidth
          onClear={handleClearFilter}
          sx={{
            width: 1,
          }}
        >
          {hasValue ? (
            <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap">
              {options
                .filter((option) => filters.includes(option.value))
                .map((option) => (
                  <Label key={option.value} sx={{ position: 'relative', pl: 2.1 }}>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        console.log('click');
                        event.stopPropagation();
                        handleRemove(option.value);
                      }}
                      sx={{ p: pxToRem(2), position: 'absolute', zIndex: 3, left: 0 }}
                    >
                      <Iconify icon="ix:clear" width={14} />
                    </IconButton>
                    {option.label}
                  </Label>
                ))}
            </Stack>
          ) : (
            `Chọn ${label.toLowerCase()}`
          )}
        </FilterButton>
        {renderMenu()}
      </Box>
    );

  return (
    <Box sx={{ height: ITEM_HEIGHT }}>
      <FilterButton
        onClick={popover.onOpen}
        hasValue={hasValue}
        onClear={handleClearFilter}
        slotProps={{
          clearButton: {},
        }}
        sx={{
          position: 'relative',
        }}
      >
        {label}{' '}
        {!!hasValue && (
          <Box
            component="span"
            sx={{
              p: 0.1,
              backgroundColor: 'info.dark',
              display: 'block',
              minWidth: 18,
              height: 18,
              borderRadius: 99,
              alignContent: 'center',
              typography: 'caption',
              color: 'white',
              ml: 0.5,
              lineHeight: 1,
            }}
          >
            {filters.length}
          </Box>
        )}
      </FilterButton>

      {renderMenu()}
    </Box>
  );
}
