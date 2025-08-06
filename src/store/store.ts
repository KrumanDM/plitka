import { configureStore } from '@reduxjs/toolkit';
import sizeReducer from './sizeSlice';
import colorReducer from './colorSlice';
import brandSlice from 'shared/components/SelectBrand/brandSlice';
import sortReducer from 'shared/api/sortSlice';
import authReducer from 'pages/Profile/authSlice';
import cartReducer from './cartSlice';
import ordersReducer from 'pages/Profile/UserProfile/orderSlice';
import logger from "redux-logger";
import authMiddleware from 'pages/Profile/authMiddleware';


const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    cart: cartReducer,
    size: sizeReducer,
    color: colorReducer,
    brand: brandSlice,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
