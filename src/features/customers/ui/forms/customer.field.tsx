'use client';

import type { FileRejection } from 'react-dropzone';
import type { CustomerSchemaType } from '../../schemas';

import { toast } from 'sonner';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, MenuItem } from '@mui/material';

import { GENDER } from 'src/constants';
import { CONFIG } from 'src/global-config';
import { useGetCustomerGroups } from 'src/features/customer-groups';

import { getFileError } from 'src/components/upload';
import { Field, BlockField, NULL_VALUE } from 'src/components/hook-form';

/* -------------------------------------------- */
type FormFieldBasicProps = {
  disabled?: boolean;
  id?: string;
};
/* -------------------------------------------- */

// MARK: Phone
/* -------------------------------------------- */
/*              CustomerPhoneField              */
/* -------------------------------------------- */
export function CustomerPhoneField({ disabled, id }: FormFieldBasicProps) {
  return (
    <BlockField label="Số điện thoại">
      <Field.Text name="phone" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Email
/* -------------------------------------------- */
/*              CustomerEmailField              */
/* -------------------------------------------- */
export function CustomerEmailField({ disabled, id }: FormFieldBasicProps) {
  return (
    <BlockField label="Email">
      <Field.Text name="email" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Code
/* -------------------------------------------- */
/*              CustomerCodeField              */
/* -------------------------------------------- */
export function CustomerCodeField({ disabled, id }: FormFieldBasicProps) {
  return (
    <BlockField label="Mã khách hàng">
      <Field.Text name="code" placeholder="Mã mặc định" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Customer group
/* -------------------------------------------- */
/*              CustomerGroupField              */
/* -------------------------------------------- */
export function CustomerGroupField({ disabled, id }: FormFieldBasicProps) {
  const { watch } = useFormContext();
  const customerGroupId = watch('customerGroupId');
  const { data, isLoading } = useGetCustomerGroups({
    searchParams: {
      perPage: Number.MAX_SAFE_INTEGER,
    },
  });
  return (
    <BlockField label="Nhóm khách hàng">
      <Field.Select
        name="customerGroupId"
        size="small"
        sx={{
          '& .MuiSelect-select': {
            ...(customerGroupId === NULL_VALUE && {
              color: 'text.secondary',
              fontWeight: 400,
            }),
          },
        }}
        disabled={disabled || isLoading}
      >
        <MenuItem
          value={NULL_VALUE}
          sx={{ color: 'text.secondary', fontWeight: 400, textTransform: 'none' }}
        >
          --Chọn nhóm khách hàng--
        </MenuItem>
        {(data?.list || []).map((customerGroup) => (
          <MenuItem key={customerGroup.id} value={customerGroup.id}>
            {customerGroup.name}
          </MenuItem>
        ))}
      </Field.Select>
    </BlockField>
  );
}

// MARK: Gender
/* -------------------------------------------- */
/*              CustomerGenderField           */
/* -------------------------------------------- */
export function CustomerGenderField({ disabled }: FormFieldBasicProps) {
  return (
    <BlockField label="Giới tính">
      <Field.RadioGroup
        row
        name="gender"
        options={[
          { label: 'Nam', value: GENDER.MALE },
          { label: 'Nữ', value: GENDER.FEMALE },
          { label: 'Khác', value: GENDER.OTHER },
        ]}
        slotProps={{
          radio: {
            disabled,
          },
        }}
      />
    </BlockField>
  );
}

// MARK: Birthday
/* -------------------------------------------- */
/*              CustomerBirthdayField           */
/* -------------------------------------------- */
export function CustomerBirthdayField({ disabled }: FormFieldBasicProps) {
  return (
    <BlockField label="Ngày sinh">
      <Field.DatePicker
        name="birthday"
        slotProps={{
          textField: {
            size: 'small',
          },
          openPickerButton: {
            size: 'small',
          },
        }}
        disabled={disabled}
        disableFuture
      />
    </BlockField>
  );
}

// MARK: Name
/* -------------------------------------------- */
/*                CustomerNameField             */
/* -------------------------------------------- */
export function CustomerNameField({ disabled }: FormFieldBasicProps) {
  return (
    <BlockField label="Tên khách hàng" required>
      <Field.Text name="name" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Note
/* -------------------------------------------- */
/*              CustomerNoteField               */
/* -------------------------------------------- */
export function CustomerNoteField({ disabled }: FormFieldBasicProps) {
  return (
    <BlockField label="Ghi chú">
      <Field.Text multiline minRows={2} name="note" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Avatar Upload
/* -------------------------------------------- */
/*              CustomerAvatarField             */
/* -------------------------------------------- */
export function CustomerAvatarField({ disabled }: FormFieldBasicProps) {
  const { setValue } = useFormContext<CustomerSchemaType>();

  const handleDeleteFile = useCallback(() => {
    setValue('avatarPath', '', { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  const handleFileErrors = (fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        const { message } = getFileError(error);

        toast.error(message);
      });
    });
  };

  return (
    <Box
      sx={{
        '& .minimal__upload__rejection__files': {
          display: 'none !important',
        },
      }}
    >
      <Field.UploadAvatar
        name="avatarPath"
        maxSize={CONFIG.maxFileSize}
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg', '.jpg'],
          'image/webp': ['.webp'],
        }}
        onDropRejected={(fileRejections) => {
          handleFileErrors(fileRejections);
        }}
        onDelete={handleDeleteFile}
        disabled={disabled}
      />
    </Box>
  );
}
