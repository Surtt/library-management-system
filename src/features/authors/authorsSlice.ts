import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { Extra, IAuthor, Status } from '@/types';

type AuthorsSlice = {
  status: Status;
  list: IAuthor[];
  error: string | null;
};

const initialState: AuthorsSlice = {
  status: 'idle',
  list: [],
  error: null,
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
  'authors/get-authors',
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

export const addAuthorThunk = createAsyncThunk(
  'authors/add-author',
  async (name: IAuthor['name']) => {
    return {
      id: nanoid(),
      name,
    };
  },
);

export const deleteAuthorThunk = createAsyncThunk('authors/delete-author', async (id: string) => {
  return id;
});

export const updateAuthorThunk = createAsyncThunk(
  'authors/update-author',
  async (author: IAuthor) => {
    return author;
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
        state.error = null;
      })
      .addCase(getAuthorsThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(getAuthorsThunk.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Cannot load data';
      })
      .addCase(addAuthorThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAuthorThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = [action.payload, ...state.list];
      })
      .addCase(addAuthorThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(deleteAuthorThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAuthorThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = state.list.filter(({ id }) => id !== action.payload);
      })
      .addCase(deleteAuthorThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(updateAuthorThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAuthorThunk.fulfilled, (state, action) => {
        state.status = 'received';
        const updatedAuthor = action.payload;
        const authorId = updatedAuthor.id;
        state.list = state.list.map((author) => {
          if (author.id === authorId) {
            return {
              ...updatedAuthor,
            };
          }
          return author;
        });
      })
      .addCase(updateAuthorThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const authorsReducer = authorsSlice.reducer;
