import type { SxProps } from '@mui/material';

import { Stack, CircularProgress } from '@mui/material';

type Props = {
  sx?: SxProps;
  size?: number;
};
export default function LoadingSpinner({ size = 60, sx }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 200, ...sx }}>
      <CircularProgress size={size} />
    </Stack>
  );
}
