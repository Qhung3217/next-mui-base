import type { ApiResponseList } from 'src/types/http.type';
import type {
  CustomerDTO,
  CustomerParams,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from 'src/features/customers';

import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

const ENDPOINT = endpoints.customers;

export type CustomersResponse = ApiResponseList<CustomerDTO[]>;
export type CustomerResponse = CustomerDTO;

export const customersService = {
  findMany: async (params?: CustomerParams) => {
    const searchParams = {
      ...params,
      customerGroupIds: params?.customerGroupIds?.length
        ? params.customerGroupIds.join(',')
        : undefined,
    };

    const response = await axios.get<CustomersResponse>(ENDPOINT.list, {
      params: searchParams,
    });

    return response.data;
  },
  findOne: async (id: string) => {
    const response = await axios.get<CustomerResponse>(ENDPOINT.detail(id));

    return response.data;
  },
  create: async (payload: CreateCustomerPayload) => {
    const response = await axios.post<CustomerResponse>(ENDPOINT.list, payload);

    return response.data;
  },
  update: async ({ id, body }: UpdateCustomerPayload) => {
    const response = await axios.patch<CustomerResponse>(ENDPOINT.update(id), body);

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
