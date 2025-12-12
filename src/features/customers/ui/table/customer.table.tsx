'use client';

import type { PaginationState } from '@tanstack/react-table';
import type { TableMeta } from './customer.column';

import { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { Paper } from '@mui/material';

import useConfirmDialog from 'src/hooks/use-confirm-dialog';

import { useGetCustomerGroups } from 'src/features/customer-groups';

import { TanstackTable, TableFilterBlock, RowSelectedToolbar } from 'src/components/table';

import { customerColumns } from './customer.column';
import { useGetCustomers, useDeleteCustomer, useDeleteCustomers } from '../../queries';

/* -------------------------------------------- */
const INITIAL_FILTERS: Filters = {
  keyword: '',
  customerGroupIds: [],
};
/* -------------------------------------------- */
type Filters = {
  keyword: string;
  customerGroupIds: string[];
};
type Props = Pick<TableMeta, 'onEdit' | 'permission'>;

export default function CustomerTable({ onEdit, permission }: Props) {
  const [globalFilters, setGlobalFilters] = useState<Filters>(INITIAL_FILTERS);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 15,
  });

  const { data: customerGroups } = useGetCustomerGroups({
    searchParams: {
      perPage: Number.MAX_SAFE_INTEGER,
    },
  });

  const { mutateAsync: deleteCustomer } = useDeleteCustomer();

  const { mutateAsync: deleteCustomers } = useDeleteCustomers();

  const [confirmDelete, renderConfirmDeleteDialog] = useConfirmDialog<{ id: string; name: string }>(
    ({ id }) => deleteCustomer(id)
  );

  const [confirmDeletes, renderConfirmDeletesDialog] = useConfirmDialog<{
    payload: { id: string; name: string }[];
    onClose: () => void;
  }>(({ payload, onClose }) =>
    deleteCustomers(
      payload.map((item) => item.id),
      {
        onSuccess: () => {
          onClose();
        },
      }
    )
  );

  const { data, isLoading } = useGetCustomers({
    searchParams: {
      page: pagination.pageIndex,
      perPage: pagination.pageSize,
      keyword: globalFilters.keyword,
      customerGroupIds: globalFilters.customerGroupIds,
    },
  });

  const table = useReactTable({
    data: data?.list || [],
    columns: customerColumns,
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
      <TableFilterBlock
        table={table}
        slots={[
          {
            filterKey: 'customerGroupIds',
            label: 'Nhóm khách hàng',
            type: 'select',
            multiple: true,
            inMenu: false,
            options: (customerGroups?.list || []).map((item) => ({
              label: item.name,
              value: item.id,
            })),
          },
        ]}
      />

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
        title: () => 'Xóa khách hàng?',
        content: ({ id, name }) => (
          <>
            Bạn xác nhận xóa khách hàng <strong>{name}</strong>? Lưu ý, thao tác này{' '}
            <strong>không thể hoàn tác</strong>
          </>
        ),
      })}
      {renderConfirmDeletesDialog({
        confirmText: ({ payload }) => `Xóa tất cả (${payload.length})`,
        title: () => 'Xóa khách hàng?',
        content: ({ payload }) => (
          <>
            Bạn xác nhận xóa các khách hàng sau:{' '}
            <strong>{payload.map((item) => item.name).join(', ')}</strong>? Lưu ý, thao tác này{' '}
            <strong>không thể hoàn tác</strong>
          </>
        ),
      })}
    </Paper>
  );
}
