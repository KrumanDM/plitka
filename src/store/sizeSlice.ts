import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SizeState {
  activeSizes: string[];
}

const initialState: SizeState = {
  activeSizes: [],
};

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    setActiveSizes(state, action: PayloadAction<string[]>) {
      state.activeSizes = action.payload;
    },
  },
});

export const { setActiveSizes } = sizeSlice.actions;
export default sizeSlice.reducer;