import { createSlice } from '@reduxjs/toolkit';
import { Active } from './types';

const initialState: Active = {
  isActive: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setActive: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { setActive } = mainSlice.actions;

export default mainSlice.reducer;
