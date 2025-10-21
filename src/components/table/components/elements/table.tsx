import { Box, type BoxProps } from '@mui/material';

type Props = BoxProps<'table'>;
export default function TTable({ ...props }: Props) {
  return (
    <Box
      component="table"
      {...props}
      sx={{
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: 1,

        minWidth: 600,
        ...props?.sx,
      }}
    />
  );
}
