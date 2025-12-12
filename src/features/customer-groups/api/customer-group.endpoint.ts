export const customerGroupEndpoints = {
  list: '/customer-groups',
  update: (id: string) => `/customer-groups/${id}`,
  detail: (id: string) => `/customer-groups/${id}`,
  remove: (id: string) => `/customer-groups/${id}`,
  removes: `/customer-groups`,
};
