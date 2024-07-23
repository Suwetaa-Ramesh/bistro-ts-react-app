import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BistrosStateType, BISTROS } from "./types";

const initialState: BistrosStateType = {
  all: {},
  index: {
    items: [],
  },
};

export const bistroSlice = createSlice({
  name: BISTROS,
  initialState,
  reducers: {
    setBistrosAction: (
      state: BistrosStateType,
      action: PayloadAction<Array<object>>
    ) => {
      state.index.items = action.payload.map((bistro: any) => bistro._id);
      action.payload.forEach((bistro: any) => {
        state.all[bistro._id] = bistro;
      });
    },
    deleteBistroAction: (
      state: BistrosStateType,
      action: PayloadAction<string>
    ) => {
      state.index.items = state.index.items.filter(
        (_id: string) => _id !== action.payload
      );
      delete state.all[action.payload];
    },
  },
});

const selectBistrosAll = (state: { bistros: BistrosStateType }) =>
  state.bistros.all;
const selectBistrosIndex = (state: { bistros: BistrosStateType }) =>
  state.bistros.index;

export const selectBistros = createSelector(
  [selectBistrosAll, selectBistrosIndex],
  (all, index) => {
    return index.items.map((id: string) => all[id]);
  }
);

export const { setBistrosAction, deleteBistroAction } = bistroSlice.actions;
export default bistroSlice.reducer;
