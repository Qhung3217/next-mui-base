'use client';

import type { PaginationState } from '@tanstack/react-table';
import type { TableMeta } from '../components';

import { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { Paper } from '@mui/material';

import useConfirmDialog from 'src/hooks/use-confirm-dialog';

import { TanstackTable, TableFilterBlock, RowSelectedToolbar } from 'src/components/table';

import { columns } from '../components';
import { useCustomerGroupsQuery, useDeleteCustomerGroup, useDeleteCustomerGroups } from '../hooks';

/* -------------------------------------------- */
const INITIAL_FILTERS: Filters = {
  keyword: '',
};
/* -------------------------------------------- */

type Filters = {
  keyword: string;
};
type Props = Pick<TableMeta, 'onEdit' | 'permission'>;
export default function CustomerGroupTable({ onEdit, permission }: Props) {
  const [globalFilters, setGlobalFilters] = useState<Filters>(INITIAL_FILTERS);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 15,
  });

  const { mutateAsync: deleteCustomerGroup } = useDeleteCustomerGroup();

  const { mutateAsync: deleteCustomerGroups } = useDeleteCustomerGroups();

  const [confirmDelete, renderConfirmDeleteDialog] = useConfirmDialog<{ id: string; name: string }>(
    ({ id }) => deleteCustomerGroup(id)
  );

  const [confirmDeletes, renderConfirmDeletesDialog] = useConfirmDialog<{
    payload: { id: string; name: string }[];
    onClose: () => void;
  }>(({ payload, onClose }) =>
    deleteCustomerGroups(
      payload.map((item) => item.id),
      {
        onSuccess: () => {
          onClose();
        },
      }
    )
  );

  const { data, isLoading } = useCustomerGroupsQuery({
    searchParams: {
      page: pagination.pageIndex,
      perPage: pagination.pageSize,
      keyword: globalFilters.keyword,
    },
  });

  const table = useReactTable({
    data: data?.list || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter: globalFilters,
    },
    onGlobalFilterChange: (filters) => {
      setGlobalFilters(filters || INITIAL_FILTERS);
      setPagination((prev) => ({
        ...prev,
        pageIndex: 1,
      }));
    },
    meta: {
      loading: isLoading,
      onDelete: confirmDelete,
      onEdit,
      permission,
    },
    rowCount: data?.meta.total,
    enableMultiRowSelection: true,
    manualPagination: true,
  });

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 0', p: 1 }}>
      <TableFilterBlock table={table} />
      <TanstackTable
        table={table}
        slotProps={{
          container: {
            mt: 1,
          },
        }}
        slots={{
          rowSelectedToolbar: (
            <RowSelectedToolbar
              table={table}
              actions={[
                {
                  icon: 'lucide:trash',
                  label: 'Xóa hết',
                  onClick: (rows, close) => {
                    confirmDeletes({ payload: rows, onClose: close });
                  },
                },
              ]}
            />
          ),
        }}
      />
      {renderConfirmDeleteDialog({
        confirmText: () => 'Xác nhận xóa',
        title: () => 'Xóa nhóm khách hàng?',
        content: ({ id, name }) => (
          <>
            Bạn xác nhận xóa nhóm khách hàng <strong>{name}</strong>? Lưu ý, thao tác này{' '}
            <strong>không thể hoàn tác</strong>
          </>
        ),
      })}
      {renderConfirmDeletesDialog({
        confirmText: ({ payload }) => `Xóa tất cả (${payload.length})`,
        title: () => 'Xóa nhóm khách hàng?',
        content: ({ payload }) => (
          <>
            Bạn xác nhận xóa các nhóm khách hàng sau:{' '}
            <strong>{payload.map((item) => item.name).join(', ')}</strong>? Lưu ý, thao tác này{' '}
            <strong>không thể hoàn tác</strong>
          </>
        ),
      })}
    </Paper>
  );
}
