import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { useJwtSignOut } from 'src/features/auth/hooks';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const { handleLogout } = useJwtSignOut();

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={() => handleLogout(onClose)}
      sx={sx}
      {...other}
    >
      Đăng xuất
    </Button>
  );
}
