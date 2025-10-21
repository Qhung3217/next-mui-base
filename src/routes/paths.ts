// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  SALE: '/sale',
  MANAGER: '/manager',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/sign-in`,
      signUp: `${ROOTS.AUTH}/sign-up`,
    },
    branch: {
      select: `${ROOTS.AUTH}/branch`,
    },
  },
  // SALE
  sale: {
    root: ROOTS.SALE,
  },
  // MANAGER
  manager: {
    root: ROOTS.MANAGER,
    report: {
      stock: `${ROOTS.MANAGER}/report/stock`,
    },
    customerGroup: {
      root: `${ROOTS.MANAGER}/customer-group`,
    },
    customer: {
      root: `${ROOTS.MANAGER}/customer`,
    },
    supplierGroup: {
      root: `${ROOTS.MANAGER}/supplier-group`,
    },
    supplier: {
      root: `${ROOTS.MANAGER}/supplier`,
    },
    productGroup: {
      root: `${ROOTS.MANAGER}/product-group`,
    },
    manufacturer: {
      root: `${ROOTS.MANAGER}/manufacturer`,
    },
    productLocation: {
      root: `${ROOTS.MANAGER}/product-location`,
    },
    medicineRoute: {
      root: `${ROOTS.MANAGER}/medicine-route`,
    },
    product: {
      root: `${ROOTS.MANAGER}/product`,
    },
    paymentMethod: {
      root: `${ROOTS.MANAGER}/payment-method`,
    },
    invoice: {
      root: `${ROOTS.MANAGER}/invoice`,
    },
    stockImport: {
      root: `${ROOTS.MANAGER}/stock-import`,
      create: `${ROOTS.MANAGER}/stock-import/create`,
      update: (id: any) => `${ROOTS.MANAGER}/stock-import/${id}/update`,
    },
    stockCheck: {
      root: `${ROOTS.MANAGER}/stock-check`,
      create: `${ROOTS.MANAGER}/stock-check/create`,
      update: (id: any) => `${ROOTS.MANAGER}/stock-check/${id}/update`,
    },
    stockCancel: {
      root: `${ROOTS.MANAGER}/stock-cancel`,
      create: `${ROOTS.MANAGER}/stock-cancel/create`,
      update: (id: any) => `${ROOTS.MANAGER}/stock-cancel/${id}/update`,
    },
    user: {
      root: `${ROOTS.MANAGER}/user`,
    },
    role: {
      root: `${ROOTS.MANAGER}/role`,
      create: `${ROOTS.MANAGER}/role/create`,
      update: (id: any) => `${ROOTS.MANAGER}/role/${id}/update`,
    },
  },
};
