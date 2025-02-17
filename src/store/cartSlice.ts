// store/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../shared/config/types';

export interface OrderData {
  items: Item[];
  totalPrice: number;
  userEmail: string | null;
  name: string;
  phone: string;
}

interface CartState {
  items: CartItem[]; // Используем CartItem вместо Item
  quantities: Record<string, number>;
  totalPrice: number;
}

export type ItemCard = {
  title: string;        // Название товара
  newPrice: string;     // Цена товара в виде строки
  description?: string; // Необязательное описание товара
  imageUrl?: string;    // Необязательный URL изображения товара
  img: string;          // Обязательное свойство
  prevPrice: string;    // Обязательное свойство
  company: string;      // Обязательное свойство
  color: string;        // Обязательное свойство
  size: string;         // Обязательное свойство
};

interface CartItem extends Item {
  totalPrice: number; // Добавляем свойство totalPrice
  quantity: number;   // Добавляем свойство quantity
}

const initialState: CartState = {
  items: [],
  quantities: {},
  totalPrice: 0,
};


export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData: OrderData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5001/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      return await response.json(); // Return the response data if needed
    } catch (error) {
      // Ensure error is typed correctly
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      return rejectWithValue(errorMessage);
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
        existingItem.totalPrice += parseFloat(item.newPrice); // Обновляем totalPrice
        existingItem.quantity += 1; // Обновляем quantity
      } else {
        // Создаем новый CartItem, включая все необходимые свойства
        const newItem: CartItem = {
          ...item,
          quantity: 1, // Инициализируем quantity для новых товаров
          totalPrice: parseFloat(item.newPrice), // Инициализируем totalPrice для новых товаров
        };
        
        state.items.push(newItem);
      }
      
      state.quantities[item.title] = (state.quantities[item.title] || 0) + 1; // Инициализируем до 0, если не определено
      state.totalPrice += parseFloat(item.newPrice);
      
      // Сохраняем данные в localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    incrementItem: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const item = state.items.find(item => item.title === title);
      if (item) {
        item.quantity += 1; // Обновляем quantity
        item.totalPrice = parseFloat(item.newPrice) * item.quantity; // Обновляем totalPrice
        state.quantities[title] += 1;
        state.totalPrice += parseFloat(item.newPrice);
        
        // Сохраняем данные в localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    decrementItem: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const item = state.items.find(item => item.title === title);
      if (item) {
        if (item.quantity === 1) {
          // Удалить товар из корзины
          state.items = state.items.filter(i => i.title !== title);
          delete state.quantities[title];
          state.totalPrice -= parseFloat(item.newPrice);
        } else {
          // Уменьшить значение quantity на 1
          item.quantity -= 1;
          item.totalPrice = parseFloat(item.newPrice) * item.quantity;
          state.quantities[title] -= 1;
          state.totalPrice -= parseFloat(item.newPrice);
        }
        
        // Сохраняем данные в localStorage
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
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.quantities = action.payload.quantities;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

// Export actions and reducer
export const { addToCart, incrementItem, decrementItem, calculateTotalPrice, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;