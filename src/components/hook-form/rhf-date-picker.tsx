import type { Dayjs } from 'dayjs';
import type { TextFieldProps } from '@mui/material';
import type { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import type { PickersTextFieldProps } from '@mui/x-date-pickers/PickersTextField';
import type { MobileDateTimePickerProps } from '@mui/x-date-pickers/MobileDateTimePicker';

import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

// ----------------------------------------------------------------------

type DateInput = Dayjs | Date | string | number | null | undefined;

function normalizeDateValue(value: DateInput): Dayjs | null {
  if (dayjs.isDayjs(value)) return value;

  const parsed = value ? dayjs(value) : null;
  return parsed?.isValid() ? parsed : null;
}

// ----------------------------------------------------------------------

type PickerProps<T extends DatePickerProps | TimePickerProps | DateTimePickerProps> = T & {
  name: string;
  slotProps?: T['slotProps'] & {
    textField?: Partial<PickersTextFieldProps>;
  };
};

export function RHFDatePicker({ name, slotProps, ...other }: PickerProps<DatePickerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          dayOfWeekFormatter={(day) => day.format('dd')}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFTimePicker({ name, slotProps, ...other }: PickerProps<TimePickerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFDateTimePicker({ name, slotProps, ...other }: PickerProps<DateTimePickerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMobileDateTimePicker({
  name,
  slotProps,
  ...other
}: PickerProps<MobileDateTimePickerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue).format())}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
