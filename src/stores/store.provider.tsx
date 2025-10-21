'use client';

import type { AppStore } from './root.reducer';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from './root.reducer';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = rootReducer();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
