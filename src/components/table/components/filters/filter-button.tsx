'use client';

import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import type { FilterOption } from '../../types';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Define props interface extending ButtonProps from MUI
interface StyledButtonProps extends ButtonProps {
  hasValue?: boolean;
  label?: string;
  options?: FilterOption[];
  filters?: string[];
  endIcon?: ReactNode;
  onClear: () => void;
  slotProps?: {
    clearButton?: SxProps;
  };
}

// Create styled button with TypeScript support
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hasValue',
})<Omit<StyledButtonProps, 'onClear'>>(({ theme, hasValue }) => ({
  borderColor: '#bdc3c7',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  '&:hover': {
    color: 'inherit',
    borderColor: '#333',
  },
  justifyContent: 'space-between',
  gridColumn: '1 / span 2',
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow']),
  ...(hasValue && {
    borderColor: '#333',
    color: '#333',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    gridColumn: '2',
  }),
  ...(!hasValue && {
    fontWeight: '400',
    color: '#adacba',
  }),
}));

export function FilterButton({
  hasValue,
  label,
  options = [],
  filters = [],
  onClick,
  children,
  onClear,
  slotProps,
  ...props
}: StyledButtonProps) {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        minHeight: { xs: 40, md: 0 },
        alignItems: 'stretch',
        height: { md: 40 },
        display: 'inline-grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: '100%',
        ...(mdDown && {
          width: 1,
        }),
        ...props.sx,
      }}
    >
      {hasValue && (
        <Button
          onClick={onClear}
          variant="outlined"
          sx={{
            minWidth: 'unset',
            minHeight: 'unset',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            height: 1,
            p: 0.5,
            borderColor: '#333',
            borderRight: 'unset',
            ...slotProps?.clearButton,
          }}
        >
          <Iconify icon="lucide:circle-x" width={15} sx={{ color: 'error.main' }} />
        </Button>
      )}
      <StyledButton
        variant="outlined"
        onClick={onClick}
        hasValue={hasValue}
        endIcon={<Iconify icon="iconamoon:arrow-down-2-bold" />}
        {...props}
      >
        {children}
      </StyledButton>
    </Box>
  );
}
