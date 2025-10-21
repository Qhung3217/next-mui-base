import { configureStore } from '@reduxjs/toolkit';

// import { saleReducer } from 'src/features/sale';
// import { paymentReducer } from 'src/features/payment';

export const rootReducer = () =>
  configureStore({
    reducer: {
      // sale: saleReducer,
      // payment: paymentReducer,s
    },
  });

export type AppStore = ReturnType<typeof rootReducer>;
