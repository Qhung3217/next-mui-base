export const endpoints = {
  file: {
    uploadMany: '/files/upload-multiple',
  },
  auth: {
    me: '/auth/me',
    accessBranch: '/auth/access-branch',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    refreshToken: '/auth/refresh-token',
  },
  customerGroups: {
    list: '/customer-groups',
    update: (id: string) => `/customer-groups/${id}`,
    detail: (id: string) => `/customer-groups/${id}`,
    remove: (id: string) => `/customer-groups/${id}`,
    removes: `/customer-groups`,
  },
  customers: {
    list: 'customers',
    update: (id: string) => `customers/${id}`,
    detail: (id: string) => `customers/${id}`,
    remove: (id: string) => `customers/${id}`,
    removes: `customers`,
  },

  // MARK:THIRD PARTY
  /* -------------------------------------------- */
  /*                  THIRD-PARTY                 */
  /* -------------------------------------------- */

  vietQR: {
    banks: 'https://api.vietqr.io/v2/banks',
    business: (taxCode: string) => `https://api.vietqr.io/v2/business/${taxCode}`,
  },
};
