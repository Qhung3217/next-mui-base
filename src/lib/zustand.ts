import type { StateCreator } from 'zustand';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export function createStore<T>(
  storeName: string,
  initializer: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]]>
) {
  return create<T>()(
    devtools(immer(initializer), {
      enabled: process.env.NODE_ENV !== 'production',
      anonymousActionType: storeName,
    })
  );
}
