import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Decks from '../../components/Decks/Decks';

export type ProductType = {
  img: string;
  title: string;
  star: string;
  reviews: string;
  prevPrice: string;
  newPrice: string;
  company: string;
  color: string;
  category: string;
  size: string;
  year: string;
}

interface DataState {
  data: ProductType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchDataDecks = createAsyncThunk('data/fetchDataDecks', async () => {
  const response = await fetch('http://localhost:5001/api/decks');
  const data = await response.json();
  return data;
});

const trucksSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataDecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataDecks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDataDecks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default trucksSlice.reducer;

