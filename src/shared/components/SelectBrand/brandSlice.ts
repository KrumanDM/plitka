import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandState {
  activeBrands: string[];
}

const initialState: BrandState = {
  activeBrands: [],
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setActiveBrands(state, action: PayloadAction<string[]>) {
      state.activeBrands = action.payload;
    },
  },
});

export const { setActiveBrands: setActiveBrands } = brandSlice.actions;
export default brandSlice.reducer;