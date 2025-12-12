'use client';

import type { SignInSchemaType } from '../../schema';

import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { CONFIG } from 'src/global-config';
import { AuthCenteredContent } from 'src/layouts';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { AnimateLogoRotate } from 'src/components/animate';

import { useJwtSignIn } from '../../hooks';
import { SignInSchema } from '../../schema';
import { FormHead } from '../components/form-head';

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const showPassword = useBoolean();
  const { error, isSubmitting, handleSignIn } = useJwtSignIn();

  const defaultValues: SignInSchemaType = {
    phone: CONFIG.auth.defaultAccount.username,
    password: CONFIG.auth.defaultAccount.password,
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await handleSignIn(data);
  });

  const renderForm = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
        '& input': {
          py: 2,
          px: 2,
        },
      }}
    >
      <Field.Text
        name="phone"
        label="Số điện thoại"
        placeholder="Số điện thoại"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Text
        name="password"
        label="Mật khẩu"
        placeholder="Mật khẩu"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Đăng nhập
      </Button>
    </Box>
  );

  return (
    <AuthCenteredContent sx={{ p: 0, borderRadius: 1 }}>
      <AnimateLogoRotate
        sx={{ mb: 3, mx: 'auto' }}
        slotProps={{
          logo: {
            sx: {
              width: 60,
              height: 60,
            },
          },
        }}
      />

      <FormHead title="Đăng nhập hệ thống" />

      {!!error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </AuthCenteredContent>
  );
}
