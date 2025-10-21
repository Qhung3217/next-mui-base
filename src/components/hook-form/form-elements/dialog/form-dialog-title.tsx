import type { DialogTitleProps } from '@mui/material/DialogTitle';

import DialogTitle from '@mui/material/DialogTitle';

type Props = DialogTitleProps;
export default function FormDialogTitle({ sx, ...props }: Props) {
  return (
    <DialogTitle
      sx={{
        p: 2,
        pb: 1,
        mb: 1,
        borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
        ...sx,
      }}
      {...props}
    />
  );
}
