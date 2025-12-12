import type { CustomerDTO } from '../data';
import type { ApiResponseList } from 'src/types/http.type';
import type { CustomerParams, CreateCustomerPayload, UpdateCustomerPayload } from '../types';

import axios from 'src/lib/axios';

import { customerEndpoints } from './customer.endpoint';

const ENDPOINT = customerEndpoints;

export type CustomersResponse = ApiResponseList<CustomerDTO[]>;
export type CustomerResponse = CustomerDTO;

export const customerApi = {
  find: async (params?: CustomerParams): Promise<CustomersResponse> => {
    const response = await axios.get<CustomersResponse>(ENDPOINT.list, {
      params,
    });

    return response.data;
  },

  findById: async (id: string): Promise<CustomerResponse> => {
    const response = await axios.get<CustomerResponse>(ENDPOINT.detail(id));

    return response.data;
  },

  create: async (payload: CreateCustomerPayload): Promise<CustomerResponse> => {
    const response = await axios.post<CustomerResponse>(ENDPOINT.list, payload);

    return response.data;
  },

  update: async ({ id, body }: UpdateCustomerPayload): Promise<CustomerResponse> => {
    const response = await axios.patch<CustomerResponse>(ENDPOINT.update(id), body);

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
