import { Dialog, Divider, DialogTitle, DialogContent } from '@mui/material';

import { ChangePasswordForm } from '.';

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function ChangePasswordDialog({ open, onClose }: Props) {
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: 1,
          maxWidth: 'sm',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ p: 2, pb: 1 }}>Đổi mật khẩu</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2 }}>
        <ChangePasswordForm
          onSubmit={onClose}
          slotProps={{
            root: {
              p: 0,
              borderRadius: 0,
              boxShadow: 'none',
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
