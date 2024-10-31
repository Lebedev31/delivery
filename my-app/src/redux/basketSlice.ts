import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketState } from "./types";

type State = {
  dataArray: BasketState[];
};

const initialState: State = {
  dataArray: [],
};

const basketSlice = createSlice({
  name: "basketState",
  initialState,
  reducers: {
    pushBasketState: (state, action: PayloadAction<BasketState>) => {
      const existingIndex = state.dataArray.findIndex(
        (item) => item.title === action.payload.title
      );

      if (existingIndex === -1) {
        state.dataArray.push(action.payload);
      } else {
        const existingItem = state.dataArray[existingIndex];
        state.dataArray[existingIndex] = {
          ...existingItem,
          sum: action.payload.sum + existingItem.sum,
          quantity: action.payload.quantity + existingItem.quantity,
          weight: existingItem.weight,
        };
      }
    },

    setCounterPlus: (
      state,
      action: PayloadAction<{ title: string; count: number; price: number }>
    ) => {
      const existingIndex = state.dataArray.findIndex(
        (item) => item.title === action.payload.title
      );

      if (existingIndex !== -1) {
        const existingItem = state.dataArray[existingIndex];
        state.dataArray[existingIndex] = {
          ...existingItem,
          quantity: action.payload.count + 1,
          sum: existingItem.sum + action.payload.price,
        };
      }
    },

    setCounterMinus: (
      state,
      action: PayloadAction<{ title: string; count: number; price: number }>
    ) => {
      const existingIndex = state.dataArray.findIndex(
        (item) => item.title === action.payload.title
      );

      if (existingIndex !== -1) {
        const existingItem = state.dataArray[existingIndex];
        state.dataArray[existingIndex] = {
          ...existingItem,
          quantity: action.payload.count - 1,
          sum: existingItem.sum - action.payload.price,
        };
      }
    },
  },
});

export const { pushBasketState, setCounterPlus, setCounterMinus } =
  basketSlice.actions;

export default basketSlice.reducer;
