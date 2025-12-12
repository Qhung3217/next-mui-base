import type { MeDTO, SignInDTO, AccessBranchDTO } from '../data';

import axios from 'src/lib/axios';

import { authEndpoint } from './auth.endpoint';

const ENDPOINT = authEndpoint;

export const authApi = {
  me: async () => {
    const response = await axios.get<MeDTO>(ENDPOINT.me);

    return response.data;
  },
  refresh: async (refreshToken: string) => {
    const response = await axios.post<{ accessToken: string }>(
      ENDPOINT.refreshToken,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  },
  signIn: async (body: { phone: string; password: string }) => {
    const response = await axios.post<SignInDTO>(ENDPOINT.signIn, body);

    return response.data;
  },
  accessBranch: async (branchId: string) => {
    const response = await axios.post<AccessBranchDTO>(ENDPOINT.accessBranch, {
      branchId,
    });

    return response.data;
  },
};
