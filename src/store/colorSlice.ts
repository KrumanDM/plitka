import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorState = {
  color: string;
}

const initialState: ColorState = {
  color: '',
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;