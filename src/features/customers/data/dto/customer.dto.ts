import type { Timestamp } from 'src/types';
import type { FileShort } from 'src/features/files';
import type { CustomerGroupDTO } from 'src/features/customer-groups';

export type CustomerDTO = Timestamp & {
  id: string;
  name: string;
  code: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  gender: string | null;
  avatarId: string | null;
  avatar: FileShort | null;
  note: string;
  customerGroupId: string | null;
  customerGroup: CustomerGroupDTO | null;
};

export type CustomerShortDTO = Pick<
  CustomerDTO,
  'id' | 'name' | 'code' | 'phone' | 'email' | 'avatar'
>;
