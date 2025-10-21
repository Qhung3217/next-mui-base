import type { RowAction } from '../types';

import { useMemo } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

type Props = {
  actions: RowAction[];
};

export default function RowActions({ actions }: Props) {
  const openMenu = usePopover();

  const render = useMemo(() => {
    const inMenu: RowAction[] = [];
    const notInMenu: RowAction[] = [];
    actions.forEach((action) => {
      if (action.inMenu) {
        inMenu.push(action);
      } else {
        notInMenu.push(action);
      }
    });
    return { inMenu, notInMenu };
  }, [actions]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end">
      {render.notInMenu.map((item) => (
        <IconButton key={item.label} onClick={item.onClick} sx={{ color: item.color }} size="small">
          <Iconify icon={item.icon} />
        </IconButton>
      ))}
      {!!render.inMenu.length && (
        <IconButton onClick={openMenu.onOpen} size={render.notInMenu.length ? 'small' : 'medium'}>
          <Iconify icon="pepicons-pencil:dots-y" />
        </IconButton>
      )}
      <Menu
        open={!!render.inMenu.length && openMenu.open}
        onClose={openMenu.onClose}
        anchorEl={openMenu.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slots={{
          transition: Fade,
        }}
      >
        {render.inMenu.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.onClick();
              openMenu.onClose();
            }}
            sx={{ color: item.color, gap: 0.5 }}
          >
            <Iconify icon={item.icon} />
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
