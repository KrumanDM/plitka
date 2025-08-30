// store/store.types.ts
import type { Middleware, Action } from '@reduxjs/toolkit';
import type { AuthState } from 'pages/Profile/authSlice';
import type { OrdersState } from 'pages/Profile/UserProfile/orderSlice';
import type { CartState } from './cartSlice';
import type { SizeState } from './sizeSlice';
import type { ColorState } from './colorSlice';
import type { BrandState } from 'shared/components/SelectBrand/brandSlice';
import type { SortState } from 'shared/api/sortSlice';

export interface RootState {
  auth: AuthState;
  orders: OrdersState;
  cart: CartState;
  size: SizeState;
  color: ColorState;
  brand: BrandState;
  sort: SortState;
}

export type AppDispatch = (...args: any[]) => any;

export type AppMiddleware = Middleware<{}, RootState, AppDispatch>;