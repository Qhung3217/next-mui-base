'use client';

import type { CustomerGroup } from '../../data';

import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';

import { LoadingSpinner } from 'src/components/loading';
import {
  Form,
  FormActions,
  FormDialogTitle,
  FormDialogActions,
  FormDialogContent,
} from 'src/components/hook-form';

import { useGetCustomerGroup } from '../../queries';
import { useCustomerGroupFormController } from '../../hooks';
import CustomerGroupDiscountField, { CustomerGroupNameField } from './customer-group.field';

// ----------------------------------------------------------------------

export type CustomerGroupFormProps = {
  open: boolean;
  onClose: () => void;
  currentRecord?: CustomerGroup | string | null;
  onLoading?: (loading: boolean) => void;
};

export default function CustomerGroupForm({
  currentRecord,
  onLoading,
  open,
  onClose,
}: CustomerGroupFormProps) {
  const isEdit = !!currentRecord;

  const recordIdProp = typeof currentRecord === 'string' ? currentRecord : null;

  const { data: customerGroup, isLoading: loading } = useGetCustomerGroup(recordIdProp, {
    enabled: !!recordIdProp,
  });

  const recordEdit = typeof currentRecord === 'string' ? customerGroup : currentRecord;

  const handleClose = () => {
    onClose();
  };

  const { methods, handleSubmit: handleFormSubmit } = useCustomerGroupFormController({
    currentRecord: recordEdit,
    onLoading,
    onCreateOnly: handleClose,
    onUpdated: handleClose,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    await handleFormSubmit(data, event);
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
}
