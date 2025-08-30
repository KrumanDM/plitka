// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sizeReducer from './sizeSlice';
import colorReducer from './colorSlice';
import brandReducer from 'shared/components/SelectBrand/brandSlice';
import sortReducer from 'shared/api/sortSlice';
import authReducer from 'pages/Profile/authSlice';
import cartReducer from './cartSlice';
import ordersReducer from 'pages/Profile/UserProfile/orderSlice';
import authMiddleware from 'pages/Profile/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    cart: cartReducer,
    size: sizeReducer,
    color: colorReducer,
    brand: brandReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;