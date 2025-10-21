import type { BoxProps } from '@mui/material';

import { pxToRem } from 'minimal-shared/utils';

import { Box } from '@mui/material';

type THeadProps = BoxProps<'thead'>;
export function THead({ ...props }: THeadProps) {
  return (
    <Box component="thead" {...props} sx={{ position: 'sticky', top: 0, zIndex: 1, ...props.sx }} />
  );
}

type THeadRowProps = BoxProps<'tr'>;
export function THeadRow({ ...props }: THeadRowProps) {
  return (
    <Box
      component="tr"
      {...props}
      sx={{
        '& .header-cell': {
          '--radius': pxToRem(8),
          '&:first-child': {
            borderTopLeftRadius: 'var(--radius)',
            borderBottomLeftRadius: 'var(--radius)',
          },
          '&:last-child': {
            borderTopRightRadius: 'var(--radius)',
            borderBottomRightRadius: 'var(--radius)',
          },
        },
        ...props.sx,
      }}
    />
  );
}

type THeadCellProps = BoxProps<'td'> & {
  isActionCell?: boolean;
};

export function THeadCell({ isActionCell, ...props }: THeadCellProps) {
  return (
    <Box
      component="th"
      className="header-cell"
      {...props}
      sx={{
        fontSize: pxToRem(12),
        py: 0.25,
        px: 0.25,
        background: '#f6f6f6',
        color: '#6d6d6d',
        fontWeight: 600,
        textAlign: 'center',
        ...(isActionCell && {
          pr: 1.5,
        }),
        ...props.sx,
      }}
    />
  );
}
