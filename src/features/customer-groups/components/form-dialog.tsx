'use client';

import type { CustomerGroup } from '../models';

import { toast } from 'sonner';
import { useEffect } from 'react';

import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';

import { LoadingSpinner } from 'src/components/loading';
import {
  Form,
  FormActions,
  FormDialogTitle,
  extractAllErrors,
  FormDialogActions,
  FormDialogContent,
} from 'src/components/hook-form';

import CustomerGroupDiscountField, { CustomerGroupNameField } from './form-fields';
import { useCustomerGroupForm, useCustomerGroupQuery, useCustomerGroupFormLogic } from '../hooks';

// ----------------------------------------------------------------------

export type CustomerGroupFormProps = {
  open: boolean;
  onClose: () => void;
  currentRecord?: CustomerGroup | string | null;
  onLoading?: (loading: boolean) => void;
};

const CustomerGroupFormDialog = ({
  currentRecord,
  onLoading,
  open,
  onClose,
}: CustomerGroupFormProps) => {
  const isEdit = !!currentRecord;

  const recordIdProp = typeof currentRecord === 'string' ? currentRecord : null;

  const { data: customerGroup, isLoading: loading } = useCustomerGroupQuery(recordIdProp, {
    enabled: !!recordIdProp,
  });

  const recordEdit = typeof currentRecord === 'string' ? customerGroup : currentRecord;

  const { methods } = useCustomerGroupForm({ currentRecord: recordEdit });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    const errorExtracted = extractAllErrors(errors);
    errorExtracted.forEach((error: any) => {
      toast.error(error.message, {
        position: 'bottom-right',
      });
    });
  }, [errors]);

  const handleClose = () => {
    onClose();
  };

  const { handleSubmit: handleFormSubmit } = useCustomerGroupFormLogic({
    currentRecord: recordEdit,
    onLoading,
    onCreateOnly: handleClose,
    onUpdated: handleClose,
  });

  const onSubmit = handleSubmit(async (data, event) => {
    await handleFormSubmit(data, event, reset);
  });

  const renderForm = () => (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormDialogContent>
        <Stack spacing={2}>
          <CustomerGroupNameField disabled={loading} />
          <CustomerGroupDiscountField disabled={loading} />
        </Stack>
      </FormDialogContent>
      <FormDialogActions sx={{ p: 2 }}>
        <FormActions isEdit={isEdit} loading={isSubmitting || loading} />
      </FormDialogActions>
    </Form>
  );

  const renderLoading = () => <LoadingSpinner />;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: 'sm',
          width: 1,
        },
      }}
    >
      <FormDialogTitle>
        {isEdit ? 'Chỉnh sửa nhóm khách hàng' : 'Thêm nhóm khách hàng'}
      </FormDialogTitle>
      {loading ? renderLoading() : renderForm()}
    </Dialog>
  );
};

export default CustomerGroupFormDialog;
