import type { UseQueryOptions } from '@tanstack/react-query';

export type UseQueryParamsOption<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
