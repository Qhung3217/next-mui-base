import type { ColumnDef } from '@tanstack/react-table';
import type { Customer } from '../../data';
import type { RowAction } from 'src/components/table';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import { fDate, fDateTime, withServerUrl } from 'src/utils';

import { RowActions } from 'src/components/table';

export type TableMeta = {
  onDelete: (props: { id: string; name: string }) => void;
  onEdit: (row: Customer) => void;
  permission: {
    CAN_DELETE: boolean;
    CAN_UPDATE: boolean;
  };
};

export const customerColumns: ColumnDef<Customer, Customer>[] = [
  {
    id: 'select',
    size: 40,
    meta: {
      sx: {
        textAlign: 'left',
      },
    },
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
    ),
  },

  {
    header: 'Mã khách',
    size: 100,
    accessorKey: 'code',
    meta: {
      sx: { textAlign: 'left' },
    },
  },
  {
    header: 'Khách hàng',
    size: 250,
    cell: ({ row }) => (
      <Stack minWidth={0} direction="row" spacing={1} alignItems="center">
        <Box sx={{ minWidth: 0 }}>
          <Avatar
            src={withServerUrl(row.original.avatar?.path)}
            alt={row.original.name}
            sx={{
              width: 48,
              height: 48,
            }}
          />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.original.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.original.birthday ? fDate(row.original.birthday, 'DD/MM/YYYY') : '--'}
          </Typography>
        </Box>
      </Stack>
    ),
    meta: {
      sx: { textAlign: 'left' },
    },
  },
  {
    header: 'Điện thoại',
    accessorKey: 'phone',
    size: 120,

    meta: {
      sx: {
        textAlign: 'center',
      },
    },
  },
  {
    header: 'Nhóm khách hàng',
    accessorKey: 'customerGroup',
    size: 120,
    cell: ({ row }) => row.original.customerGroup?.name || '--',
    meta: {
      sx: {
        textAlign: 'center',
      },
    },
  },

  {
    header: 'Cập nhật lần cuối',
    size: 120,
    accessorKey: 'updatedAt',
    meta: {
      sx: {
        textAlign: 'center',
      },
    },
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return fDateTime(updatedAt, 'DD/MM/YYYY HH:mm');
    },
  },
  {
    header: '##',
    size: 40,
    meta: {
      sx: {
        textAlign: 'right',
      },
    },
    id: 'actions',
    cell: ({ row, table }) => {
      const {
        onDelete,
        onEdit,
        permission: { CAN_DELETE, CAN_UPDATE },
      } = table.options.meta as TableMeta;
      const actions: RowAction[] = [];

      if (CAN_UPDATE) {
        actions.push({
          inMenu: true,
          icon: 'fluent:edit-24-filled',
          label: 'Chỉnh sửa',
          color: 'warning.main',
          onClick: () => {
            onEdit(row.original);
          },
        });
      }
      if (CAN_DELETE) {
        actions.push({
          inMenu: true,
          icon: 'material-symbols-light:delete-rounded',
          label: 'Xóa',
          color: 'error.main',
          onClick: () => {
            onDelete({
              id: row.original.id,
              name: row.original.name,
            });
          },
        });
      }

      return <RowActions actions={actions} />;
    },
  },
];
