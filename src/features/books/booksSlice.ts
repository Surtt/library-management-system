import { faker } from '@faker-js/faker';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { Extra, IBook, Status, TAddBook, TStatus } from '@/types';

type BooksState = {
  status: Status;
  // error: string | null;
  list: IBook[];
};

const initialState: BooksState = {
  status: 'idle',
  // error: null,
  list: [],
};

export const getBooksThunk = createAsyncThunk<
  { data: IBook[] },
  undefined,
  {
    state: { books: BooksState };
    extra: Extra;
    rejectValue: string;
  }
>(
  'books/getBooks',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.BOOKS);
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
        books: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  },
);

export const borrowBookThunk = createAsyncThunk(
  'books/borrowBook',
  async (payload: { id: string; userId: string }) => {
    return payload;
  },
);

export const returnBookThunk = createAsyncThunk('books/returnBook', async (id: string) => {
  return id;
});

export const addBookThunk = createAsyncThunk('books/addBook', async (book: TAddBook) => {
  return {
    ...book,
    id: nanoid(),
    publishedDate: new Date().toISOString(),
    status: 'available' as TStatus,
    borrowerId: null,
    borrowDate: null,
    returnDate: null,
    image: faker.image.business(),
  };
});

export const deleteBookThunk = createAsyncThunk('books/deleteBook', async (id: string) => {
  return id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooksThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(getBooksThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(borrowBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(borrowBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        const { id, userId } = action.payload;

        state.list = state.list.map((book: IBook) => {
          if (book.id === id) {
            return {
              ...book,
              status: 'borrowed',
              borrowerId: userId,
              borrowDate: new Date().toISOString(),
            };
          }
          return book;
        });
      })
      .addCase(borrowBookThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(returnBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(returnBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        const id = action.payload;
        state.list = state.list.map((book: IBook) => {
          if (book.id === id) {
            return {
              ...book,
              status: 'available',
              borrowerId: null,
              borrowDate: null,
              returnDate: new Date().toISOString(),
            };
          }
          return book;
        });
      })
      .addCase(returnBookThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(addBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list.push(action.payload);
      })
      .addCase(addBookThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(deleteBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = state.list.filter(({ id }) => id !== action.payload);
      })
      .addCase(deleteBookThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const booksReducer = booksSlice.reducer;
