import type { Gender, BaseReqSearchParams } from 'src/types';

export type CustomerParams = BaseReqSearchParams & {
  customerGroupIds?: string[];
};

export type CreateCustomerPayload = {
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  gender?: Gender;
  avatarId?: string;
  note?: string;
  customerGroupId?: string | null;
};

export type UpdateCustomerPayload = {
  id: string;
  body: Partial<CreateCustomerPayload>;
};
