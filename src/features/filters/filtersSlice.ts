import { createSlice } from '@reduxjs/toolkit';

type FiltersSlice = {
  filter: {
    available: boolean;
    author: string;
  };
};

const initialState: FiltersSlice = {
  filter: {
    available: false,
    author: '',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterAction: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilterAction } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
