import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';
import { apiSliderSlice } from './apiSliderSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    [apiSliderSlice.reducerPath]: apiSliderSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSliderSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
