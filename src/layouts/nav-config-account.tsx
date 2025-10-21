import type { AccountPopoverProps } from './components/account-popover';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Bán hàng',
    href: paths.sale.root,
    icon: <Iconify icon="lucide:diamond-percent" width={16} />,
  },
  {
    label: 'Quản lý',
    href: paths.sale.root,
    icon: <Iconify icon="lucide:diamond-percent" width={14} />,
  },
];
