import { createStore } from 'src/lib';

export type CounterState = {
  count: number;
};
export type CounterAction = {
  inc: () => void;
};

export type CounterStore = CounterState & CounterAction;

export const useCounterStore = createStore<CounterState & CounterAction>('counter', (set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }), undefined, 'inc'),
}));
