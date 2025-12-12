import type { ApiResponseList } from 'src/types/http.type';
import type {
  CustomerGroupDTO,
  CustomerGroupParams,
  CreateCustomerGroupPayload,
  UpdateCustomerGroupPayload,
} from 'src/features/customer-groups';

import axios from 'src/lib/axios';

import { customerGroupEndpoints } from './customer-group.endpoint';

const ENDPOINT = customerGroupEndpoints;

export type CustomerGroupsResponse = ApiResponseList<CustomerGroupDTO[]>;
export type CustomerGroupResponse = CustomerGroupDTO;

export const customerGroupApi = {
  find: async (params?: CustomerGroupParams): Promise<CustomerGroupsResponse> => {
    const response = await axios.get<CustomerGroupsResponse>(ENDPOINT.list, {
      params,
    });

    return response.data;
  },

  findById: async (id: string): Promise<CustomerGroupResponse> => {
    const response = await axios.get<CustomerGroupResponse>(ENDPOINT.detail(id));

    return response.data;
  },

  create: async (payload: CreateCustomerGroupPayload): Promise<CustomerGroupResponse> => {
    const response = await axios.post<CustomerGroupResponse>(ENDPOINT.list, payload);

    return response.data;
  },

  update: async ({ id, body }: UpdateCustomerGroupPayload): Promise<CustomerGroupResponse> => {
    const response = await axios.patch<CustomerGroupResponse>(ENDPOINT.update(id), body);

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(ENDPOINT.remove(id));
  },

  deleteMany: async (ids: string[]): Promise<void> => {
    await axios.delete(ENDPOINT.removes, {
      data: {
        ids,
      },
    });
  },
};
