import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Extra, ICategory, Status } from '@/types';

type CategoriesSlice = {
  status: Status;
  list: ICategory[];
};

const initialState: CategoriesSlice = {
  status: 'idle',
  list: [],
};

export const getCategoriesThunk = createAsyncThunk<
  { data: ICategory[] },
  undefined,
  {
    state: { categories: CategoriesSlice };
    extra: Extra;
    rejectValue: string;
  }
>(
  'categories/get-categories',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.CATEGORIES);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        categories: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(getCategoriesThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
