import type { BoxProps } from '@mui/material';

import { pxToRem } from 'minimal-shared/utils';

import { Box } from '@mui/material';

type TBodyProps = BoxProps<'body'>;
export function TBody({ ...props }: TBodyProps) {
  return (
    <Box
      component="tbody"
      {...props}
      sx={{
        '& tr': {
          '&:hover': {
            background: '#f6f6f6',
          },
        },

        ...props?.sx,
      }}
    />
  );
}

type TRowProps = BoxProps<'tr'>;
export function TBodyRow({ ...props }: TRowProps) {
  return <Box component="tr" {...props} />;
}

type TBodyCellProps = BoxProps<'td'>;
export function TBodyCell({ ...props }: TBodyCellProps) {
  return (
    <Box
      component="td"
      className="row-cell"
      {...props}
      sx={{
        borderBottom: '1px solid #f8f9f9',
        py: 0.25,
        px: 0.25,
        fontSize: pxToRem(14),

        ...props?.sx,
      }}
    />
  );
}
