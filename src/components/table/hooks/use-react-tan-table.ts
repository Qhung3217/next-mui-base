import type { TanTableOptions } from '../types';

import { useReactTable } from '@tanstack/react-table';

export function useReactTanTable<TData>(props: TanTableOptions<TData>) {
  return useReactTable<TData>(props);
}
