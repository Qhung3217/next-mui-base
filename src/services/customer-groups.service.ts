import type { ApiResponseList } from 'src/types/http.type';
import type {
  CustomerGroupDTO,
  CustomerGroupParams,
  CreateCustomerGroupPayload,
  UpdateCustomerGroupPayload,
} from 'src/features/customer-groups';

import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

const ENDPOINT = endpoints.customerGroups;

export type CustomerGroupsResponse = ApiResponseList<CustomerGroupDTO[]>;
export type CustomerGroupResponse = CustomerGroupDTO;

export const customerGroupsService = {
  findMany: async (params?: CustomerGroupParams) => {
    const response = await axios.get<CustomerGroupsResponse>(ENDPOINT.list, {
      params,
    });

    return response.data;
  },
  findOne: async (id: string) => {
    const response = await axios.get<CustomerGroupResponse>(ENDPOINT.detail(id));

    return response.data;
  },
  create: async (payload: CreateCustomerGroupPayload) => {
    const response = await axios.post<CustomerGroupResponse>(ENDPOINT.list, payload);

    return response.data;
  },
  update: async ({ id, body }: UpdateCustomerGroupPayload) => {
    const response = await axios.patch<CustomerGroupResponse>(ENDPOINT.update(id), body);

    return response.data;
  },
  delete: async (id: string) => {
    const response = await axios.delete(ENDPOINT.remove(id));

    return response.data;
  },
  deleteMany: async (ids: string[]) => {
    const response = await axios.delete(ENDPOINT.removes, {
      data: {
        ids,
      },
    });

    return response.data;
  },
};
