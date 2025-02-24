import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  filters: Record<string, string | number>;
}

const initialState: FiltersState = {
  filters: {
    category: "All",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Record<string, string | number>>) {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;