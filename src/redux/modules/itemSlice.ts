import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type List = {
  id: number;
  title?: string;
  desc?: string;
};

const initialState: List[] = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<List>) => {
      const newList = [...state, action.payload];
      return newList;
    },
  },
  extraReducers: {},
});
export const { addItems } = itemSlice.actions;
export default itemSlice.reducer;
