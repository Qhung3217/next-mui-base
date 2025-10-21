import type { StackProps } from '@mui/material';

import { pxToRem } from 'minimal-shared/utils';

import { Box, Stack, Tooltip, Typography } from '@mui/material';

import { Iconify } from '../iconify';

type Props = Omit<StackProps, 'children' | 'label' | 'required'> & {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  info?: string;
};

export default function BlockField({ children, label, required, info, sx, ...props }: Props) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        width: 1,
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: pxToRem(12), fontWeight: 500, alignContent: 'center', display: 'flex' }}
      >
        {label}
        {required && (
          <Box component="strong" sx={{ color: 'error.main', fontSize: '1rem', lineHeight: '1' }}>
            {' '}
            *
          </Box>
        )}
        {info && (
          <Tooltip title={info} placement="top" arrow>
            <Box component="span" sx={{ height: 20 }}>
              <Iconify icon="clarity:info-solid" sx={{ color: 'info.main' }} />
            </Box>
          </Tooltip>
        )}
      </Typography>
      {children}
    </Stack>
  );
}
