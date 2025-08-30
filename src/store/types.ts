// store/types.ts
import type { Middleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store.types';

type AppMiddleware = Middleware<{}, RootState, AppDispatch>;
