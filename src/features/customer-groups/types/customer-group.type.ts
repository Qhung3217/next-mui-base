import type { Discount, BaseReqSearchParams } from 'src/types';

export type CustomerGroupParams = BaseReqSearchParams;

export type CreateCustomerGroupPayload = Partial<Discount> & {
  name: string;
};

export type UpdateCustomerGroupPayload = {
  id: string;
  body: Partial<CreateCustomerGroupPayload>;
};
