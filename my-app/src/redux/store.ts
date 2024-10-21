import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import { apiSliderSlice } from "./apiSliderSlice";
import { apiPopularFoodSlice } from "./apiPopularSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    [apiSliderSlice.reducerPath]: apiSliderSlice.reducer,
    [apiPopularFoodSlice.reducerPath]: apiPopularFoodSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliderSlice.middleware,
      apiPopularFoodSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
