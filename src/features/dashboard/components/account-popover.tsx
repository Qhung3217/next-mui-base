'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import { usePathname } from 'next/navigation';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { withServerUrl } from 'src/utils';
import { PERMISSIONS } from 'src/constants';
import { AccountButton } from 'src/layouts/components/account-button';
import { useAuthContext, useCheckPermission } from 'src/features/auth';
import { SignOutButton } from 'src/layouts/components/sign-out-button';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {};

export function AccountPopover({ sx, ...other }: AccountPopoverProps) {
  const { CAN_VIEW_SALE } = useCheckPermission({
    CAN_VIEW_SALE: PERMISSIONS.VIEW.SALE,
  });

  const { user } = useAuthContext();

  const pathname = usePathname();

  const { open, anchorEl, onClose, onOpen } = usePopover();

  const isBranchPage = pathname.startsWith(paths.auth.branch.select);

  const renderMenuActions = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        paper: { sx: { p: 0, width: 1, maxWidth: 300, mt: 1.5 } },
        arrow: { offset: 18 },
      }}
    >
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.fullName}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {user?.phone}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <MenuList sx={{ p: 1, my: 1, '& li': { p: 0 }, ...(isBranchPage && { display: 'none' }) }}>
        {[
          {
            title: 'Bán hàng',
            icon: 'hugeicons:cashier-02',
            href: paths.sale.root,
            sx: !CAN_VIEW_SALE && {
              display: 'none',
            },
          },
          // {
          //   title: 'Quản lý',
          //   icon: 'lsicon:management-outline',
          //   href: paths.manager.root,
          // },
        ].map((item) => (
          <MenuItem key={item.title}>
            <Link
              component={RouterLink}
              href={item.href}
              underline="none"
              onClick={onClose}
              sx={{
                px: 1,
                py: 0.75,
                width: 1,
                display: 'flex',
                typography: 'body2',
                alignItems: 'center',
                color: 'text.secondary',
                '& svg': { width: 24, height: 24 },
                '&:hover': { color: 'text.primary' },
                ...item.sx,
              }}
            >
              <Iconify icon={item.icon} />

              <Box component="span" sx={{ ml: 2 }}>
                {item.title}
              </Box>
            </Link>
          </MenuItem>
        ))}
      </MenuList>

      {!isBranchPage && <Divider sx={{ my: 1 }} />}

      <Box sx={{ p: 1 }}>
        <SignOutButton
          size="medium"
          variant="text"
          onClose={onClose}
          sx={{ display: 'block', textAlign: 'left' }}
        />
      </Box>
    </CustomPopover>
  );

  return (
    <>
      <AccountButton
        onClick={onOpen}
        photoURL={withServerUrl(user?.avatar?.path) || ''}
        displayName={user?.fullName || ''}
        sx={sx}
        {...other}
      />

      {renderMenuActions()}
    </>
  );
}
