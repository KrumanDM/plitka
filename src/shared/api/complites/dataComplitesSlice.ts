import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

type DataState = {
  data: ProductType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchComplitesData = createAsyncThunk('/api/complites', async () => {
  const response = await fetch('http://localhost:5001/api/complites');
  const data = await response.json();
  return data;
});


const dataComplitesSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplitesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComplitesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchComplitesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
  },
});

export default dataComplitesSlice.reducer;
