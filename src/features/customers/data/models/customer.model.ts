import type { Timestamp } from 'src/types';
import type { FileShort } from 'src/features/files';
import type { CustomerGroup } from 'src/features/customer-groups';

export type Customer = Timestamp & {
  id: string;
  name: string;
  code: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  gender: string | null;
  genderLabel: string;
  note: string;
  customerGroupId: string | null;
  customerGroup: CustomerGroup | null;
  avatarId: string | null;
  avatar: FileShort | null;
};

export type CustomerShort = Pick<Customer, 'id' | 'name' | 'code' | 'phone' | 'email' | 'avatar'>;
