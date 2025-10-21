'use client';

import type { Option } from './type';

import { useRef, useState } from 'react';
import { useThrottle } from '@react-hook/throttle';

type Props<T> = {
  onSelect: (value: Option<T> | null, index: number) => void;
  onReset?: () => void;
};
export default function useSearchbar<T>({ onSelect, onReset }: Props<T>) {
  const [rawKeyword, setRawKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useThrottle(rawKeyword, 5); // 1000 / 5 = 200ms

  const onChange = (value: Option<T> | null, index: number) => {
    onSelect(value, index);
    setRawKeyword(value ? value.name : '');
  };
  const handleInputChange = (value: string) => {
    setRawKeyword(value);
    setKeyword(value);
    inputRef.current?.click();
  };

  const resetState = () => {
    setRawKeyword('');
    setKeyword('');
    onReset?.();
  };

  const updateLocalState = (value: any | null) => {
    setRawKeyword(value?.name || '');
    setKeyword(value?.name || '');
  };

  // useEffect(
  //   () => () => {
  //     resetState();
  //   },
  //   []
  // );

  return {
    rawKeyword,
    keyword,
    updateLocalState,
    handleInputChange,
    onChange,
    resetState,
    inputRef,
  };
}
