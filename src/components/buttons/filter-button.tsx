import type { IconButtonProps } from '@mui/material/IconButton';

import IconButton from '@mui/material/IconButton';

import { Iconify } from '../iconify';

export type FilterButtonProps = Omit<IconButtonProps, 'children'> & {
  count?: number;
};
export default function FilterButton({ count, ...props }: FilterButtonProps) {
  return (
    <IconButton
      size="small"
      {...props}
      sx={{
        position: 'relative',
        ...(!!count && {
          '&::before': {
            content: `"${count}"`,
            position: 'absolute',
            top: '-30%',
            right: '-30%',
            minWidth: 20,
            minHeight: 20,
            borderRadius: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'secondary.main',
            color: 'white',
            fontSize: 10,
            lineHeight: 1,
            fontWeight: 700,
          },
        }),
        ...props.sx,
      }}
    >
      <Iconify icon="lucide:funnel" />
    </IconButton>
  );
}
