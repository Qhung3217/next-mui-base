import type { BaseReqSearchParams } from 'src/types';

export const customerKeys = {
  all: ['customers'],
  lists: ['customers', 'list'],
  list: (filter?: BaseReqSearchParams) => ['customers', 'list', filter],
  details: ['customers', 'details'],
  detail: (id: string) => ['customers', 'detail', id],
};
