import type { DialogActionsProps } from '@mui/material/DialogActions';

import DialogActions from '@mui/material/DialogActions';

type Props = DialogActionsProps;
export default function FormDialogActions({ sx, ...props }: Props) {
  return (
    <DialogActions
      sx={{
        p: 2,

        ...sx,
      }}
      {...props}
    />
  );
}
