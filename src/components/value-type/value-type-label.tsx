'use client';

import type { BoxProps } from '@mui/material';
import type { DiscountType } from 'src/types';

import { usePopover } from 'minimal-shared/hooks';

import { Box, Stack, Popover } from '@mui/material';

export type ValueType = DiscountType;

export type BaseProps = Omit<BoxProps, 'children'> & {
  disabled?: boolean;
};

type Props = BaseProps & {
  type: ValueType;
};

export default function ValueTypeLabel({ type, disabled, ...boxProps }: Props) {
  if (type === 'PERCENT') {
    return <PercentValueTypeLabel disabled={disabled} {...boxProps} />;
  }
  return <FixedValueTypeLabel disabled={disabled} {...boxProps} />;
}

type PopoverValueTypeLabel = Props & {
  onChange: (value: ValueType) => void;
};

export function PopoverValueTypeLabel({ type, onChange }: PopoverValueTypeLabel) {
  const popover = usePopover();

  const renderChoice = (value: ValueType) => (
    <Box
      onClick={() => {
        onChange(value);
        popover.onClose();
      }}
      sx={{
        cursor: 'pointer',
        transition: (theme) => theme.transitions.create('opacity'),
        '&:hover': {
          opacity: 0.8,
        },
        ...(value === type && {
          fontWeight: 700,
          backgroundColor: 'background.neutral',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 0.5,
        }),
        p: 0.5,
        mx: 0.5,
      }}
    >
      <ValueTypeLabel type={value} />
    </Box>
  );

  return (
    <>
      <Box
        onClick={popover.onOpen}
        sx={{
          cursor: 'pointer',
          transition: (theme) => theme.transitions.create('opacity'),
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <ValueTypeLabel type={type} />
      </Box>
      <Popover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              background: '#fafcfd',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              px: 0,
            },
          },
        }}
      >
        <Stack direction="column" spacing={0.1} sx={{ p: 0 }}>
          {renderChoice('PERCENT')}
          {renderChoice('VALUE')}
        </Stack>
      </Popover>
    </>
  );
}

export const FixedValueTypeLabel = ({ disabled, sx, ...boxProps }: BaseProps) => (
  <Box
    sx={{
      backgroundColor: '#28A745',
      borderRadius: 0.5,
      p: 0.5,
      py: 0.3,
      lineHeight: 0.86,
      fontWeight: 'bold',
      color: 'white',
      ...(disabled && {
        opacity: 0.8,
        filter: 'grayscale(1)',
      }),
      ...sx,
    }}
    {...boxProps}
  >
    VNĐ
  </Box>
);

export const PercentValueTypeLabel = ({ disabled, sx, ...boxProps }: BaseProps) => (
  <Box
    sx={{
      backgroundColor: '#007BFF',
      borderRadius: 0.5,
      p: 0.5,
      py: 0.3,
      lineHeight: 0.86,
      fontWeight: 'bold',
      color: 'white',
      minWidth: 30,
      textAlign: 'center',

      ...(disabled && {
        opacity: 0.8,
        filter: 'grayscale(1)',
      }),
      ...sx,
    }}
    {...boxProps}
  >
    %
  </Box>
);
