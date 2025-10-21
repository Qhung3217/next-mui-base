'use client';

import type { Table } from '@tanstack/react-table';
import type { RowSelectedAction } from '../types';

import React, { useMemo } from 'react';

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

type Props<T> = {
  table: Table<T>;
  actions: RowSelectedAction<T>[];
};
export default function RowSelectedToolbar<T>({ table, actions }: Props<T>) {
  const selectedRowModels = table.getSelectedRowModel();

  const selectedRows = useMemo(
    () => (selectedRowModels.flatRows || []).map((row) => row.original),
    [selectedRowModels]
  );

  const handleClear = () => {
    table.resetRowSelection();
  };

  return (
    <Zoom in={!!selectedRows.length}>
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: 0,
          right: 0,
        }}
      >
        <Paper
          component={Stack}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{
            width: 'fit-content',
            mx: 'auto',
            p: 1,
            minWidth: 250,
            border: (theme) => `1px solid  ${theme.palette.primary.light}`,
            boxShadow: (theme) => theme.shadows[20],
            borderRadius: 1.5,
            color: '#7d7d7d',
          }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}
            title={`${selectedRows.length} hàng được chọn`}
          >
            <Iconify icon="lucide:square-check" sx={{ color: 'primary.main' }} />
            <Typography variant="body2" sx={{ fontSize: 12, lineHeight: 1, display: 'block' }}>
              {selectedRows.length} hàng
            </Typography>
          </Box>
          <Box>
            {actions.map((action) => (
              <Box
                component="button"
                key={action.label}
                sx={{
                  appearance: 'none',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 0.5,
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  minHeight: 30,
                  background: 'transparent',
                }}
                onClick={() => {
                  action.onClick(selectedRows, handleClear);
                }}
              >
                <Iconify icon={action.icon} width={16} sx={{ color: '#555' }} />
                <Typography
                  variant="caption"
                  sx={{ lineHeight: 1, display: 'block', color: 'inherit' }}
                >
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <IconButton
            size="small"
            sx={{ borderRadius: 1, boxShadow: '0 0 0 1px #E0E0E0' }}
            title="Bỏ chọn tất cả"
            onClick={handleClear}
          >
            <Iconify icon="lucide:x" width={16} />
          </IconButton>
        </Paper>
      </Box>
    </Zoom>
  );
}
