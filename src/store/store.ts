import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../shared/api/dataSlice';
import sizeReducer from './sizeSlice';
import colorReducer from './colorSlice';
import brandSlice from '../shared/components/SelectBrand/brandSlice';
import sortReducer from '../shared/api/sortSlice';
import authReducer from '../pages/Profile/authSlice';
import cartReducer from './cartSlice';
import ordersReducer from '../pages/Profile/UserProfile/orderSlice';
import complitesReducer from '../shared/api/complites/dataComplitesSlice';
import trucksReducer from "../shared/api/trucks/dataTrucksSlice";
import logger from "redux-logger";
import authMiddleware from 'pages/Profile/authMiddleware';


const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    orders: ordersReducer,
    cart: cartReducer,
    complites: complitesReducer,
    trucks: trucksReducer,
    size: sizeReducer,
    color: colorReducer,
    brand: brandSlice,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, authMiddleware),
});
//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
