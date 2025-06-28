import { createSlice } from '@reduxjs/toolkit';

type Product = {
  title: string;
  newPrice: string;
  year: string;
}

const initialState = {
  label: '',
  sortedProducts: [] as Product[], // Update the type of sortedProducts
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortLabel(state, action) {
      state.label = action.payload;
    },
    setSortedProducts(state, action) {
      state.sortedProducts = action.payload;
    },
    sortByPriceHighToLow(state, action) {
      const products = action.payload;
      const sortedProducts = [...products].sort(
        (a, b) => parseFloat(b.newPrice) - parseFloat(a.newPrice)
      );
      state.sortedProducts = sortedProducts;
    },
    sortByPriceLowToHigh(state, action) {
      const products = action.payload;
      const sortedProducts = [...products].sort(
        (a, b) => parseFloat(a.newPrice) - parseFloat(b.newPrice)
      );
      state.sortedProducts = sortedProducts;
    },
    sortByTitleAZ(state, action) {
      const products = action.payload;
      const sortedProducts = [...products].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      state.sortedProducts = sortedProducts;
    },
    sortByTitleZA(state, action) {
      const products = action.payload;
      const sortedProducts = [...products].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      state.sortedProducts = sortedProducts;
    },
    sortByNewest(state, action) {
      const products = action.payload;
      const sortedProducts = [...products].sort(
        (a, b) => parseFloat(b.year) - parseFloat(a.year)
      );
      state.sortedProducts = sortedProducts;
    },
  },
});

export const {
  setSortLabel,
  setSortedProducts,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByTitleAZ,
  sortByTitleZA,
  sortByNewest,
} = sortSlice.actions;
export default sortSlice.reducer;