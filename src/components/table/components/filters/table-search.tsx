'use client';

import { useRef, useCallback } from 'react';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { debounce, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

type Props = {
  onChange: (value: string) => void;
  debounceDelay?: number;
  placeholder?: string;
};
export default function TableSearch({
  onChange,
  debounceDelay = 300,
  placeholder = 'Tìm kiếm..',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, debounceDelay),
    [onChange, debounceDelay]
  );

  // Clear the input value and emit empty string
  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      onChange('');
    }
  }, [onChange]);

  // Handle input change with debounce
  const handleInputChange = useCallback(() => {
    const value = inputRef.current?.value || '';
    debouncedOnChange(value);
  }, [debouncedOnChange]);

  return (
    <OutlinedInput
      fullWidth
      size="small"
      inputRef={inputRef}
      onChange={handleInputChange}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="lucide:search" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleClear}
            edge="end"
            size="small"
            sx={{ visibility: inputRef.current?.value ? 'visible' : 'hidden' }}
          >
            <Iconify icon="lucide:x" />
          </IconButton>
        </InputAdornment>
      }
      sx={{
        transition: 'width 0.3s ease',
        width: {
          xs: 1,
          md: 300,
        },
      }}
    />
  );
}
