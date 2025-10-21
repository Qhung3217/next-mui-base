import type { BaseReqSearchParams } from 'src/types';

export const customerGroupKeys = {
  all: ['customer-groups'],
  lists: ['customer-groups', 'list'],
  list: (filter?: BaseReqSearchParams) => ['customer-groups', 'list', filter],
  details: ['customer-groups', 'details'],
  detail: (id: string) => ['customer-groups', 'detail', id],
};
