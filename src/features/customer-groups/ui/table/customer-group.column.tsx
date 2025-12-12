import type { ColumnDef } from '@tanstack/react-table';
import type { CustomerGroup } from '../../data';
import type { RowAction } from 'src/components/table';

import Checkbox from '@mui/material/Checkbox';

import { fDateTime } from 'src/utils';

import { RowActions } from 'src/components/table';

export type TableMeta = {
  onDelete: (props: { id: string; name: string }) => void;
  onEdit: (row: CustomerGroup) => void;
  permission: {
    CAN_DELETE: boolean;
    CAN_UPDATE: boolean;
  };
};

export const customerGroupColumns: ColumnDef<CustomerGroup, CustomerGroup>[] = [
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
    header: 'Tên nhóm',
    size: 250,
    accessorKey: 'name',
    meta: {
      sx: { textAlign: 'left' },
    },
  },
  {
    header: 'Chiếc khấu',
    accessorKey: 'discountLabel',
    size: 120,

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
