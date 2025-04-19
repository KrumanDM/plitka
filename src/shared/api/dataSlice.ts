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

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const results = await Promise.allSettled([
    fetch('http://localhost:5001/api/products/decks'),
    fetch('http://localhost:5001/api/products/trucks'),
    fetch('http://localhost:5001/api/products/complites'),
  ]);

  const data = await Promise.all(results.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value.json();
    } else {
      throw new Error(result.reason);
    }
  }));

  // Объединяем массивы в один массив
  const flatData = data.flat();

  // Преобразуем данные в нужный формат
  const formattedData = flatData.map((product) => ({
    img: product.img,
    title: product.title,
    star: product.star,
    reviews: product.reviews,
    prevPrice: product.prevPrice,
    newPrice: product.newPrice,
    company: product.company,
    color: product.color,
    category: product.category,
    size: product.size,
    year: product.year,
  }));

  return formattedData;
});


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      })
  },
});

export default dataSlice.reducer;
