import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../shared/api/dataSlice';
import decksReducer from '../shared/api/decks/decksSlice'
import sizeReducer from './sizeSlice';
import colorReducer from './colorSlice';
import brandSlice from '../shared/components/SelectBrand/brandSlice';
import sortReducer from '../shared/api/sortSlice';
import authReducer from '../pages/Profile/authSlice';
import cartReducer from './cartSlice';
import ordersReducer from '../pages/Profile/UserProfile/orderSlice';
import complitesReducer from '../shared/api/complites/dataComplitesSlice'
import trucksReducer from "../shared/api/trucks/dataTrucksSlice"

const store = configureStore({
  reducer: {
    size: sizeReducer,
    data: dataReducer,
    color: colorReducer,
    brand: brandSlice,
    sort: sortReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    decks: decksReducer,
    complites: complitesReducer,
    trucks: trucksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
