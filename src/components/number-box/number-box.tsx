'use client';

import type { SxProps } from '@mui/material/styles';

import { useBoolean } from 'minimal-shared/hooks';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Box, Badge, Tooltip, OutlinedInput } from '@mui/material';

import { useInputCurrency } from 'src/hooks';

import { Iconify } from '../iconify';

type Props = {
  quantity: number;
  onChange?: (quantity: number) => void;
  warningMessage?: string;
  min?: number;
  max?: number;
  slotProps?: {
    container?: {
      sx?: SxProps;
    };
    buttons?: {
      sx?: SxProps;
      icon?: {
        size?: number;
        sx?: SxProps;
      };
    };
    value?: {
      sx?: SxProps;
    };
  };
};
export default function NumberBox({
  quantity,
  onChange,
  warningMessage,
  slotProps,
  min = 0,
  max = Infinity,
}: Props) {
  const isFocus = useBoolean(false);

  const {
    inputRef,
    displayValue,
    onChange: onInputChange,
    onKeyDown,
    onBlur,
    onFocus,
  } = useInputCurrency(quantity, {
    onBlur: (value) => {
      const valueNumber = Number(value);
      handleUpdate(valueNumber);
      isFocus.onFalse();
    },
    onFocus: isFocus.onTrue,
    isBindingValue: true,
  });

  const handleMinus = () => {
    if (onChange) {
      handleUpdate(Math.max(0, quantity - 1));
    }
  };

  const handlePlus = () => {
    if (onChange) {
      handleUpdate(quantity + 1);
    }
  };

  const handleUpdate = (value: number) => {
    const clampedValue = Math.min(Math.max(value, min), max);
    if (onChange) {
      onChange(clampedValue);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        minWidth: 120,
        width: 'fit-content',
        '& .icon-btn': {
          border: '1px solid #dbdede',
          p: 0.5,
        },
        ...slotProps?.container?.sx,
      }}
      spacing={1}
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton size="small" onClick={handleMinus} className="icon-btn" {...slotProps?.buttons}>
        <Iconify
          icon="lucide:minus"
          width={slotProps?.buttons?.icon?.size || 16}
          sx={slotProps?.buttons?.icon?.sx}
        />
      </IconButton>

      <Tooltip title={warningMessage} hidden={!warningMessage} placement="top" arrow>
        <Badge color="error" overlap="rectangular" variant={warningMessage ? 'dot' : 'invisible'}>
          <Box
            sx={{
              minWidth: 0,
              width: 'fit-content',
              maxWidth: 50,
              position: 'relative',
              '&::before': {
                content: `"${displayValue}"`,
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                alignContent: 'center',
                textAlign: 'center',
                fontWeight: 400,
                ...(isFocus.value && {
                  display: 'none',
                }),
              },
            }}
          >
            <OutlinedInput
              inputRef={inputRef}
              type="number"
              value={displayValue}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              onFocus={onFocus}
              size="small"
              sx={{
                minWidth: 0,
                maxWidth: 50,
                '*': {
                  borderRadius: 0,
                  borderLeft: 'none',
                  borderTop: 'none',
                  borderRight: 'none',
                },
                '& input': {
                  p: 0.5,
                  textAlign: 'center',
                  minWidth: 30,
                  width: 'fit-content',
                },
                ...slotProps?.value?.sx,
              }}
              slotProps={{
                input: {
                  autoComplete: 'off',
                },
              }}
            />
          </Box>
        </Badge>
      </Tooltip>

      <IconButton size="small" onClick={handlePlus} className="icon-btn" {...slotProps?.buttons}>
        <Iconify
          icon="lucide:plus"
          width={slotProps?.buttons?.icon?.size || 16}
          sx={slotProps?.buttons?.icon?.sx}
        />
      </IconButton>
    </Stack>
  );
}
