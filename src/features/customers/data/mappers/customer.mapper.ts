import type { Customer, CustomerShort } from '../models';
import type { CustomerDTO, CustomerShortDTO } from '../dto';

import { formatGenderLabel } from 'src/utils';
import { mapFileShort } from 'src/features/files';
import { mapCustomerGroup } from 'src/features/customer-groups';

export const mapCustomer = (dto: CustomerDTO): Customer => ({
  id: dto.id,
  name: dto.name,
  code: dto.code,
  email: dto.email,
  phone: dto.phone,
  birthday: dto.birthday,
  gender: dto.gender,
  genderLabel: formatGenderLabel(dto.gender),
  customerGroupId: dto.customerGroupId,
  note: dto.note,
  customerGroup: dto.customerGroup ? mapCustomerGroup(dto.customerGroup) : null,
  avatar: dto.avatar ? mapFileShort(dto.avatar) : null,
  avatarId: dto.avatarId,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

export const mapCustomerList = (list: CustomerDTO[]): Customer[] => list.map(mapCustomer);

export const mapCustomerShort = (dto: CustomerShortDTO): CustomerShort => ({
  id: dto.id,
  name: dto.name,
  code: dto.code,
  phone: dto.phone,
  email: dto.email,
  avatar: dto.avatar ? mapFileShort(dto.avatar) : null,
});
