'use client';

import type { RefObject, ChangeEvent, KeyboardEvent } from 'react';
import type { InputNumberValue } from 'src/utils';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { fCurrency, fCurrencyToNumber } from 'src/utils';

/**
 * const { displayValue, onChange, onKeyDown, onBlur, onFocus, getNumericValue } = useInputCurrency();
 * <input
        type="text"
        value={displayValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
 */
interface UseInputCurrencyReturn {
  inputRef: RefObject<any>;
  value: number;
  displayValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<any>) => void;
  onBlur: () => void;
  onFocus: () => void;
  setValue: (value: InputNumberValue) => void;
  getNumericValue: () => number;
}

export default function useInputCurrency(
  initialValue: InputNumberValue = '',
  options?: {
    isBindingValue?: boolean;
    onBlur?: (value: string) => void;
    onFocus?: (value: string) => void;
    onChange?: (value: string) => void;
    onKeyDown?: (event: KeyboardEvent<any>, rawValue: string) => void;
  }
): UseInputCurrencyReturn {
  const [rawValue, setRawValue] = useState<string>(() =>
    initialValue !== null && initialValue !== undefined ? String(initialValue) : ''
  );
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (options?.isBindingValue && initialValue !== undefined) {
      setRawValue(initialValue ? String(initialValue) : '');
    }
  }, [options?.isBindingValue, initialValue]);

  // Giá trị hiển thị - định dạng tiền tệ khi không focus, hiển thị raw khi focus
  const displayValue = useMemo(() => {
    if (isFocused) {
      return rawValue;
    }
    return rawValue ? fCurrency(rawValue) : '';
  }, [rawValue, isFocused]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsFocused(true);
      const inputValue = event.target.value;
      setRawValue(inputValue);
      if (options?.onChange) {
        options.onChange(inputValue);
      }
    },
    [options?.onChange]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setRawValue(fCurrencyToNumber(fCurrency(rawValue)).toString());
    if (options?.onBlur) {
      options.onBlur(fCurrencyToNumber(fCurrency(rawValue)).toString());
    }
  }, [rawValue, options?.onBlur]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (options?.onKeyDown) {
        options.onKeyDown(event, rawValue);
      }
      const allowedKeys = [
        8, // Backspace
        9, // Tab
        13, // Enter
        27, // Escape
        35, // End
        36, // Home
        37, // Arrow Left
        38, // Arrow Up
        39, // Arrow Right
        40, // Arrow Down
        46, // Delete
        65, // A (Ctrl+A)
        67, // C (Ctrl+C)
        86, // V (Ctrl+V)
        88, // X (Ctrl+X)
        190, // Period
        110, // Decimal point
        188, // Comma
      ];

      if (event.key === 'Enter') {
        inputRef.current?.blur();
        handleBlur();

        return;
      }
      // Cho phép các phím điều hướng và phím tắt
      if (allowedKeys.includes(event.keyCode)) {
        // Cho phép Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        if ((event.ctrlKey || event.metaKey) && [65, 67, 86, 88].includes(event.keyCode)) {
          return;
        }

        // Cho phép dấu chấm và phẩy, nhưng ngăn nhiều dấu
        // if (event.keyCode === 190 || event.keyCode === 110 || event.keyCode === 188) {
        //   const currentValue = (event.target as any).value;
        //   console.log('🚀 ~ useInputCurrency ~ currentValue:', currentValue);
        //   if (currentValue.includes('.') || currentValue.includes(',')) {
        //     event.preventDefault();
        //     return;
        //   }

        //   // Ngăn dấu chấm/phẩy ở đầu
        //   if (currentValue === '') {
        //     event.preventDefault();
        //     return;
        //   }
        // }

        return;
      }

      // Chỉ cho phép số (0-9) cả trên main keyboard và numpad
      if (
        (event.keyCode < 48 || event.keyCode > 57) && // Main keyboard numbers
        (event.keyCode < 96 || event.keyCode > 105) // Numpad numbers
      ) {
        event.preventDefault();
      }
    },
    [handleBlur, options?.onKeyDown, rawValue]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (options?.onFocus) {
      options.onFocus(rawValue);
    }
  }, [rawValue, options?.onFocus]);

  // Hàm để set giá trị từ bên ngoài
  const setValue = useCallback((value: InputNumberValue) => {
    if (value === null || value === undefined) {
      setRawValue('');
    } else {
      setRawValue(String(value));
    }
  }, []);

  // Hàm chuyển đổi sang số (để lưu vào database)
  const getNumericValue = useCallback(
    (): number => (rawValue ? fCurrencyToNumber(rawValue) : 0),
    [rawValue]
  );

  return {
    inputRef,
    value: Number(rawValue),
    displayValue, // Giá trị hiển thị
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    onFocus: handleFocus,
    setValue,
    // Thêm hàm utility để lấy giá trị số
    getNumericValue,
  };
}
