import type { IconButtonProps } from '@mui/material/IconButton';

import { useBoolean } from 'minimal-shared/hooks';

import IconButton from '@mui/material/IconButton';

import { Iconify } from '../iconify';

export type SortDirectionButtonProps = Omit<
  IconButtonProps,
  'children' | 'onClick' | 'onChange'
> & {
  variant?: 'alphabetical' | 'numerical';
  onChange?: (
    direction: 'asc' | 'desc',
    event: Parameters<NonNullable<IconButtonProps['onClick']>>[0]
  ) => void;
};
export default function SortDirectionButton({
  variant = 'alphabetical',
  onChange,
  ...props
}: SortDirectionButtonProps) {
  const changeDirection = useBoolean();

  const handleClick = (event: Parameters<NonNullable<IconButtonProps['onClick']>>[0]) => {
    if (changeDirection.value) {
      onChange?.('asc', event);
    } else {
      onChange?.('desc', event);
    }
    changeDirection.onToggle();
  };

  if (variant === 'numerical')
    return (
      <IconButton
        size="small"
        onClick={handleClick}
        title={changeDirection.value ? 'Sắp xếp giảm dần' : 'Sắp xếp tăng dần'}
        {...props}
      >
        <Iconify icon={changeDirection.value ? 'lucide:arrow-up-0-1' : 'lucide:arrow-down-0-1'} />
      </IconButton>
    );
  return (
    <IconButton
      size="small"
      onClick={handleClick}
      title={changeDirection.value ? 'Sắp xếp giảm dần' : 'Sắp xếp tăng dần'}
      {...props}
    >
      <Iconify icon={changeDirection.value ? 'lucide:arrow-up-a-z' : 'lucide:arrow-down-a-z'} />
    </IconButton>
  );
}
