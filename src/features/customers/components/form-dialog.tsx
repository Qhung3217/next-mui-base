'use client';

import type { Customer } from '../models';

import { toast } from 'sonner';
import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { Grid, Dialog, Button } from '@mui/material';

import { LoadingSpinner } from 'src/components/loading';
import {
  Form,
  FormActions,
  FormDialogTitle,
  extractAllErrors,
  FormDialogActions,
  FormDialogContent,
} from 'src/components/hook-form';

import { useCustomerForm, useCustomerQuery, useCustomerFormLogic } from '../hooks';
import {
  CustomerCodeField,
  CustomerNameField,
  CustomerNoteField,
  CustomerPhoneField,
  CustomerEmailField,
  CustomerGroupField,
  CustomerGenderField,
  CustomerAvatarField,
  CustomerBirthdayField,
} from './form-fields';

// ----------------------------------------------------------------------

export type CustomerFormProps = {
  open: boolean;
  onClose: () => void;
  currentRecord?: Customer | string | null;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (customer: Customer) => void;
  oneAction?: boolean;
};

const CustomerFormDialog = ({
  currentRecord,
  onLoading,
  open,
  onClose,
  onSuccess,
  oneAction,
}: CustomerFormProps) => {
  const isEdit = !!currentRecord;

  const recordIdProp = typeof currentRecord === 'string' ? currentRecord : null;

  const { data: customerGroup, isLoading: loading } = useCustomerQuery(recordIdProp, {
    enabled: !!recordIdProp,
  });

  const recordEdit = typeof currentRecord === 'string' ? customerGroup : currentRecord;

  const { methods } = useCustomerForm({ currentRecord: recordEdit });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, dirtyFields, errors },
    setValue,
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

  const { handleSubmit: handleFormSubmit } = useCustomerFormLogic({
    currentRecord: recordEdit,
    onLoading,
    onCreateOnly: handleClose,
    onSuccess,
    onUpdated: handleClose,
    dirtyFields,
    setValue,
  });

  const onSubmit = handleSubmit(async (data, event) => {
    await handleFormSubmit(data, event, reset);
  });

  const renderForm = () => (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormDialogContent>
        <Grid container spacing={2}>
          <Grid container size={12}>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomerAvatarField disabled={loading} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <CustomerNameField disabled={loading} />
                  <CustomerCodeField disabled={loading} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <CustomerPhoneField disabled={loading} />
                  <CustomerGroupField disabled={loading} />
                </Stack>

                <CustomerGenderField disabled={loading} />
              </Stack>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <CustomerEmailField disabled={loading} />

                <CustomerBirthdayField disabled={loading} />
              </Stack>
              <CustomerNoteField disabled={loading} />
            </Stack>
          </Grid>
        </Grid>
      </FormDialogContent>
      <FormDialogActions sx={{ p: 2 }}>
        {oneAction ? (
          <Button
            loading={isSubmitting || loading}
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isEdit ? 'Lưu thay đổi' : 'Lưu dữ liệu'}
          </Button>
        ) : (
          <FormActions isEdit={isEdit} loading={isSubmitting || loading} />
        )}
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
          maxWidth: 'md',
          width: 1,
        },
      }}
    >
      <FormDialogTitle>{isEdit ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}</FormDialogTitle>
      {loading ? renderLoading() : renderForm()}
    </Dialog>
  );
};

export default CustomerFormDialog;
