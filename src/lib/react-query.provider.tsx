'use client';

import { useState, type ReactNode } from 'react';
import { AxiosError, HttpStatusCode } from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, MutationCache, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            // retry: 1,

            retry: (failureCount, error) => {
              if (
                error instanceof AxiosError &&
                error.response?.status === HttpStatusCode.Unauthorized
              ) {
                return false;
              }
              if (failureCount <= 3) return true;
              return false;
            },
          },
        },
        mutationCache: new MutationCache({
          onError: (error: any, variables: unknown, context: unknown) => {
            console.error('Error Report:', {
              section: 'mutation',
              error: {
                message: error.message,
                stack: error.stack,
                status: error.statusCode,
              },
              variables,
              context,
              timestamp: new Date().toISOString(),
            });
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
