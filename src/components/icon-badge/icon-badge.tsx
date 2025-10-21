import type { BoxProps } from '@mui/material/Box';
import type { IconifyProps } from '../iconify';

import Box from '@mui/material/Box';

import { Iconify } from '../iconify';

export type IconBadgeProps = Omit<BoxProps, 'children'> & {
  icon: string;
  slotProps?: {
    icon?: Omit<IconifyProps, 'icon'>;
  };
};

export default function IconBadge({ icon, slotProps, ...boxProps }: IconBadgeProps) {
  return (
    <Box
      {...boxProps}
      sx={{
        p: 0.5,
        backgroundColor: 'primary.light',
        borderRadius: 99,
        minWidth: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1/1',
        ...boxProps.sx,
      }}
    >
      <Iconify icon={icon} {...slotProps?.icon} />
    </Box>
  );
}
