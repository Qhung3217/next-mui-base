import type { Dayjs } from 'dayjs';
import type { SxProps } from '@mui/material';

import { useRef } from 'react';

import { Stack } from '@mui/material';

import { fIsAfter } from 'src/utils';

import { Iconify } from '../iconify';
import { DateCalendarPicker } from './date-calendar-picker';

type Props = {
  from: {
    value: Dayjs | null;
    onChange: (newDate: Dayjs | null) => void;
  };
  to: {
    value: Dayjs | null;
    onChange: (newDate: Dayjs | null) => void;
  };
  sx?: SxProps;
};
export function DateRangeBox({ from, to, sx }: Props) {
  const dateInputToRef = useRef<HTMLButtonElement>(null);

  const isInValid = from.value && to.value ? fIsAfter(from.value, to.value) : false;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      spacing={{ xs: 0.5, md: 2 }}
      width={1}
      sx={{
        ...sx,
      }}
    >
      <DateCalendarPicker
        closeAfterSelect
        error={isInValid}
        slotProps={{
          dateCalendar: {
            dayOfWeekFormatter: (date) => date.format('dd'),
            reduceAnimations: true,
            disableFuture: true,
            shouldDisableDate: (date) => (to.value ? !fIsAfter(to.value.add(1), date) : false),
          },
        }}
        value={from.value}
        onChange={(value) => {
          from.onChange(value);
          if (!to.value) {
            dateInputToRef.current?.click();
          }
        }}
        label="Từ ngày"
      />
      <Iconify icon="lucide:minus" />
      <DateCalendarPicker
        label="Đến ngày"
        closeAfterSelect
        slotProps={{
          button: {
            ref: dateInputToRef,
          },
          dateCalendar: {
            dayOfWeekFormatter: (date) => date.format('dd'),
            reduceAnimations: true,
            disableFuture: true,
            shouldDisableDate: (date) =>
              from.value ? fIsAfter(from.value.subtract(1), date) : false,
          },
        }}
        value={to.value}
        onChange={(value) => to.onChange(value)}
      />
    </Stack>
  );
}
