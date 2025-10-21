'use client';

import type { SxProps } from '@mui/material';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import BlockField from 'src/components/hook-form/block-field';

import { useChangePasswordForm } from '../hooks';
import useChangePasswordFormLogic from '../hooks/use-change-password-form-logic';

// ----------------------------------------------------------------------

type Props = {
  onSubmit?: () => void;
  slotProps?: {
    root?: SxProps;
  };
};
export default function ChangePasswordView({ onSubmit: emitSubmit, slotProps }: Props) {
  const showPassword = useBoolean();

  const { methods } = useChangePasswordForm();

  const { handleSubmit: handleFormSubmit } = useChangePasswordFormLogic({
    onSuccess: showPassword.onFalse,
    onSubmit: emitSubmit,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await handleFormSubmit(data, reset);
  });

  return (
    <Card
      sx={{
        p: 3,
        width: 1,
        ...slotProps?.root,
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <BlockField label="Mật khẩu hiện tại" required>
            <Field.Text
              name="oldPassword"
              type={showPassword.value ? 'text' : 'password'}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <Iconify
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </BlockField>
          <BlockField label="Mật khẩu mới" required>
            <Field.Text
              name="newPassword"
              size="small"
              type={showPassword.value ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <Iconify
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              helperText={
                <Box component="span" sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                  {/* <Iconify icon="eva:info-fill" width={16} /> */}
                  <Box>
                    Mật khẩu phải có ít nhất <strong>6 ký tự</strong> <br />
                    Mật khẩu phải chứa ít nhất một <strong>chữ hoa</strong>, một{' '}
                    <strong>chữ thường</strong>, một <strong>số</strong> và một{' '}
                    <strong>ký tự đặc biệt</strong>
                  </Box>
                </Box>
              }
            />
          </BlockField>
          <BlockField label="Nhập lại mật khẩu" required>
            <Field.Text
              name="confirmNewPassword"
              type={showPassword.value ? 'text' : 'password'}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <Iconify
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </BlockField>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Đổi mật khẩu
          </LoadingButton>
        </Box>
      </Form>
    </Card>
  );
}
