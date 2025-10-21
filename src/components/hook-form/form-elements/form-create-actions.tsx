'use client';

import type { SxProps } from '@mui/material';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton';

import { useRef, forwardRef } from 'react';
import { pxToRem } from 'minimal-shared/utils';
import { useBoolean } from 'minimal-shared/hooks';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Collapse, Typography } from '@mui/material';

import { Iconify } from '../../iconify';

// ----------------------------------------------------------------------

const StyledButton = forwardRef<any, Omit<LoadingButtonProps, 'ref'>>((props, ref) => (
  <LoadingButton
    ref={ref}
    fullWidth
    variant="soft"
    color="primary"
    size="medium"
    {...props}
    sx={{
      minWidth: 0,
      ...props.sx,
    }}
  />
));

// ----------------------------------------------------------------------

type FormActionsProps = {
  loading?: boolean;
  disabled?: boolean;
  slotProps?: {
    root?: SxProps;
    actionsWrap?: SxProps;
    button?: SxProps;
  };
};

export default function FormCreateActions({ loading, disabled, slotProps }: FormActionsProps) {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const extend = useBoolean();

  return (
    <Box
      sx={{
        width: 1,
        ...slotProps?.root,
      }}
    >
      <button type="submit" style={{ display: 'none' }} value="create" />
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        alignItems="center"
        spacing={{ xs: 2, md: 2 }}
        sx={{
          width: 1,
          ...slotProps?.actionsWrap,
        }}
      >
        <StyledButton
          type="submit"
          variant="soft"
          loading={loading}
          disabled={disabled}
          startIcon={<Iconify icon="lucide:copy" />}
          sx={slotProps?.button}
          value="create-and-continue"
        >
          Lưu và nhân bản
        </StyledButton>
        <StyledButton
          type="submit"
          variant="outlined"
          loading={loading}
          disabled={disabled}
          startIcon={<Iconify icon="lucide:rotate-ccw" />}
          sx={slotProps?.button}
          value="create-and-reset"
        >
          Lưu và tạo mới
        </StyledButton>

        <StyledButton
          ref={submitBtnRef}
          type="submit"
          variant="contained"
          loading={loading}
          disabled={disabled}
          startIcon={<Iconify icon="lucide:save" />}
          sx={slotProps?.button}
          value="create"
        >
          Lưu dữ liệu
        </StyledButton>
      </Stack>

      <Box sx={{ mt: 2, color: '#444' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 0.5,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
            width: 'fit-content',
            borderRadius: 1,
            ml: -0.5,
            cursor: 'pointer',
          }}
          onClick={extend.onToggle}
        >
          <Typography variant="body2" sx={{ fontWeight: '600', fontSize: pxToRem(12) }}>
            Mô tả hành động
          </Typography>
          <Iconify
            icon="lucide:chevron-down"
            width={16}
            sx={{
              transition: (theme) =>
                theme.transitions.create(['transform'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
              transform: !extend.value ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Box>
        <Collapse in={extend.value}>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ lineHeight: 1 }}>
              <strong>Lưu dữ liệu:</strong> Lưu dữ liệu và quay lại trang danh sách để xem toàn bộ
              dữ liệu đã tạo.
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1 }}>
              <strong>Lưu và tạo mới:</strong> Lưu dữ liệu hiện tại và làm trống các trường để tạo
              dữ liệu mới khác.
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1 }}>
              <strong> Lưu và nhân bản:</strong> Lưu dữ liệu và giữ nguyên thông tin đã nhập để tạo
              một dữ liệu tương tự.
            </Typography>
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
}
