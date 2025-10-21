import type { CustomerGroup, CustomerGroupDTO } from '../models';

import { mapDiscountType, formatDiscountLabel } from 'src/utils';

export const mapCustomerGroup = (dto: CustomerGroupDTO): CustomerGroup => ({
  id: dto.id,
  name: dto.name,
  discountType: mapDiscountType(dto.discountType),
  discountValue: dto.discountValue,
  discountLabel: formatDiscountLabel(dto.discountType, dto.discountValue),
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

export const mapCustomerGroupList = (list: CustomerGroupDTO[]): CustomerGroup[] =>
  list.map(mapCustomerGroup);
