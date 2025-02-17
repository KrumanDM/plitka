import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
  _id: string;
  // Другие поля заказа
}

interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const getOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userEmail: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/orders/${userEmail}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error');
      }
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/orders/${orderId}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error');
      }
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string | null;
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.orders = state.orders.filter((order) => order._id !== action.payload._id);
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string | null;
    });
  },
});

export default ordersSlice.reducer;
