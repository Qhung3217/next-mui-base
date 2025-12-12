'use client';

import type { CustomerGroup } from '../../data';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useQueryParam } from 'src/hooks';
import { PERMISSIONS } from 'src/constants';
import { ManagerContent } from 'src/layouts';
import { useCheckPermission } from 'src/features/auth';

import { CustomerGroupForm } from '../forms';
import { CustomerGroupTable } from '../table';

/* -------------------------------------------- */
type Action = { type: 'form'; row: CustomerGroup | string | null } | null;

/* -------------------------------------------- */

export default function CustomerGroupListScreen() {
  const [action, setAction] = useState<Action>(null);

  const [editId, setEditIdParam] = useQueryParam('edit');

  const { CAN_CREATE, CAN_DELETE, CAN_UPDATE } = useCheckPermission({
    CAN_CREATE: PERMISSIONS.CUSTOMER_GROUP.CREATE,
    CAN_DELETE: PERMISSIONS.CUSTOMER_GROUP.DELETE,
    CAN_UPDATE: PERMISSIONS.CUSTOMER_GROUP.UPDATE,
  });

  useEffect(() => {
    if (editId) {
      // Only update if:
      // 1. There's no current action, OR
      // 2. The current action is not a form, OR
      // 3. The current form action is for a different customerType
      if (
        CAN_UPDATE &&
        (action?.type !== 'form' ||
          (action.type === 'form' &&
            (typeof action.row === 'string' ? action.row !== editId : action.row?.id !== editId)))
      ) {
        setAction({
          type: 'form',
          row: editId,
        });
        setEditIdParam(editId);
      }
    }
  }, [editId, CAN_UPDATE]);

  useEffect(
    () => () => {
      setEditIdParam(undefined);
    },
    []
  );

  return (
    <ManagerContent maxWidth={false}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Typography variant="h3">Nhóm khách hàng</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
          {CAN_CREATE && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setAction({ type: 'form', row: null });
              }}
            >
              Thêm mới
            </Button>
          )}
        </Stack>
      </Stack>
      <CustomerGroupTable
        permission={{
          CAN_DELETE,
          CAN_UPDATE,
        }}
        onEdit={(row: CustomerGroup) => {
          setEditIdParam(row.id);
          setAction({ type: 'form', row });
        }}
      />
      {(CAN_CREATE || CAN_UPDATE) && action && action.type === 'form' && (
        <CustomerGroupForm
          open
          onClose={() => {
            setEditIdParam(undefined);
            setTimeout(() => {
              setAction(null);
            }, 100);
          }}
          currentRecord={action.row}
        />
      )}
    </ManagerContent>
  );
}
