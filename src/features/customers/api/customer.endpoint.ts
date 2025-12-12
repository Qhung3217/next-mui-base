export const customerEndpoints = {
  list: '/customers',
  update: (id: string) => `/customers/${id}`,
  detail: (id: string) => `/customers/${id}`,
  remove: (id: string) => `/customers/${id}`,
  removes: `/customers`,
};
