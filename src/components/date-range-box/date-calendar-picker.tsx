import type { Dayjs } from 'dayjs';
import type { ButtonProps, PopoverProps } from '@mui/material';
import type { DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';

import { usePopover } from 'minimal-shared/hooks';

import { Zoom, Button, Popover } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { fDate } from 'src/utils';

import { Iconify } from '../iconify';

type Props = {
  label: string;
  value: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
  closeAfterSelect?: boolean;
  error?: boolean;

  slotProps?: {
    dateCalendar?: Omit<DateCalendarProps, 'value' | 'onChange'>;

    button?: Omit<ButtonProps, 'children'>;
    popover?: Omit<PopoverProps, 'children' | 'open'>;
  };
};
export function DateCalendarPicker({
  label,
  value,
  onChange,
  error,
  closeAfterSelect,
  slotProps: { button, popover, dateCalendar } = {},
}: Props) {
  const openCalendar = usePopover();

  const handleChange = (newDate: Dayjs | null) => {
    onChange(newDate);
    if (closeAfterSelect) {
      openCalendar.onClose();
    }
  };

  return (
    <>
      <Button
        startIcon={<Iconify icon="lucide:calendar" />}
        onClick={openCalendar.onOpen}
        sx={{
          ...(error && {
            borderColor: 'error.main',
            color: 'error.main',
          }),

          ...button?.sx,
        }}
        {...button}
      >
        {value ? fDate(value) : label}
      </Button>
      <Popover
        open={openCalendar.open}
        onClose={openCalendar.onClose}
        anchorEl={openCalendar.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slots={{
          transition: Zoom,
        }}
        transitionDuration={{
          appear: 100,
          enter: 100,
          exit: 100,
        }}
        {...popover}
      >
        <DateCalendar
          value={value}
          onChange={handleChange}
          dayOfWeekFormatter={(date) => date.format('dd')}
          {...dateCalendar}
        />
      </Popover>
    </>
  );
}
