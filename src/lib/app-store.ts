'use client';

import type { AppStore } from 'src/stores';

import { useStore, useDispatch, useSelector } from 'react-redux';

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppStore = useStore.withTypes<AppStore>();
