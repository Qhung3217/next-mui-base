'use client';

import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material';

import { Card, Stack, Divider, CardHeader, CardContent } from '@mui/material';

type Props = {
  children: ReactNode;
  title: string;
  sx?: SxProps;
};
export default function FormCard({ children, sx, title }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <CardHeader title={title} sx={{ mb: 1, pt: 2 }} />

      <Divider />

      <CardContent>
        <Stack spacing={3}>{children}</Stack>
      </CardContent>
    </Card>
  );
}
