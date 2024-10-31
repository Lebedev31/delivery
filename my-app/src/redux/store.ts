import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import { apiSliderSlice } from "./apiSliderSlice";
import { apiPopularFoodSlice } from "./apiPopularSlice";
import { apiCategorySlice } from "./apiCategorySlice";
import basketReducer from "../redux/basketSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    basketState: basketReducer,
    [apiSliderSlice.reducerPath]: apiSliderSlice.reducer,
    [apiPopularFoodSlice.reducerPath]: apiPopularFoodSlice.reducer,
    [apiCategorySlice.reducerPath]: apiCategorySlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliderSlice.middleware,
      apiPopularFoodSlice.middleware,
      apiCategorySlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
