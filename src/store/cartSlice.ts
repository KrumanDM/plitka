import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'shared/config/types';

export type OrderData = {
  items: Item[];
  totalPrice: number;
  name: string;
  phone: string;
};

export type CartState = {
  items: CartItem[];
  quantities: Record<string, number>;
  totalPrice: number;
};

export type ItemCard = {
  title: string;
  newPrice: string;
  description?: string;
  imageUrl?: string;
  img: string;
  prevPrice: string;
  company: string;
  color: string;
  size: string;
};

interface CartItem extends Item {
  totalPrice: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
  quantities: {},
  totalPrice: 0,
};

// --- Оформление заказа ---
export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData: OrderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// --- Получение заказов текущего пользователя ---
export const getMyOrders = createAsyncThunk(
  'cart/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// --- Удаление заказа ---
export const deleteOrder = createAsyncThunk(
  'cart/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ItemCard>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.title === item.title);

      if (existingItem) {
        existingItem.totalPrice += parseFloat(item.newPrice);
        existingItem.quantity += 1;
      } else {
        const newItem: CartItem = {
          ...item,
          quantity: 1,
          totalPrice: parseFloat(item.newPrice),
        };
        state.items.push(newItem);
      }

      state.quantities[item.title] = (state.quantities[item.title] || 0) + 1;
      state.totalPrice += parseFloat(item.newPrice);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const item = state.items.find(item => item.title === title);
      if (item) {
        item.quantity += 1;
        item.totalPrice = parseFloat(item.newPrice) * item.quantity;
        state.quantities[title] += 1;
        state.totalPrice += parseFloat(item.newPrice);
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const item = state.items.find(item => item.title === title);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(i => i.title !== title);
          delete state.quantities[title];
          state.totalPrice -= parseFloat(item.newPrice);
        } else {
          item.quantity -= 1;
          item.totalPrice = parseFloat(item.newPrice) * item.quantity;
          state.quantities[title] -= 1;
          state.totalPrice -= parseFloat(item.newPrice);
        }
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce((total, item) => {
        return total + (parseFloat(item.newPrice) * (state.quantities[item.title] || 0));
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.quantities = {};
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.quantities = action.payload.quantities;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { addToCart, incrementItem, decrementItem, calculateTotalPrice, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
