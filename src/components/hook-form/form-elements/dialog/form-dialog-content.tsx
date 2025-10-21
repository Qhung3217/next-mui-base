import type { DialogContentProps } from '@mui/material/DialogContent';

import DialogContent from '@mui/material/DialogContent';

type Props = DialogContentProps;
export default function FormDialogContent({ sx, ...props }: Props) {
  return (
    <DialogContent
      dividers
      sx={{
        px: 2,

        ...sx,
      }}
      {...props}
    />
  );
}
