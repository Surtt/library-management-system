import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Extra, IAuthor, Status } from '@/types';

type AuthorsSlice = {
  status: Status;
  list: IAuthor[];
};

const initialState: AuthorsSlice = {
  status: 'idle',
  list: [],
};

export const getAuthorsThunk = createAsyncThunk<
  { data: IAuthor[] },
  undefined,
  {
    state: { authors: AuthorsSlice };
    extra: Extra;
    rejectValue: string;
  }
>(
  'authors/getAuthors',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.AUTHORS);
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
        authors: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  },
);

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAuthorsThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(getAuthorsThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const authorsReducer = authorsSlice.reducer;
