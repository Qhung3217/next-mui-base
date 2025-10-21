import type { SxProps, Theme } from '@mui/material';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    sx?: SxProps<Theme>;
  }
}
