'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useQueryParam<T extends string>(
  key: string,
  defaultValue?: T
): [T | undefined, (value: T | undefined) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = (searchParams.get(key) as T) || defaultValue;

  const setValue = useCallback(
    (newValue: T | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newValue === defaultValue || !newValue) {
        params.delete(key);
      } else {
        params.set(key, newValue);
      }

      router.push(`?${params.toString()}`);
    },
    [key, router, searchParams, defaultValue]
  );

  return [value, setValue];
}
