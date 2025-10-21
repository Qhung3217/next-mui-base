'use client';

import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material';

import { Card, CardContent } from '@mui/material';

type Props = {
  sx?: SxProps;
  children: ReactNode;
};
export function FormFooter({ sx, children }: Props) {
  return (
    <Card
      sx={{
        width: 1,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,

        ...sx,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
