import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type ProductType = {
  img: string;
  title: string;
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

export const fetchTrucksData = createAsyncThunk('/api/trucks', async () => {
  const response = await fetch('http://localhost:5001/api/trucks');
  const data = await response.json();
  return data;
});


const dataTrucksSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucksData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrucksData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTrucksData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
  },
});

export default dataTrucksSlice.reducer;
