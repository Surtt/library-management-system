import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { IUser, Status } from '@/types';

type UserState = {
  status: Status;
  user: IUser | null;
};

const initialState: UserState = {
  status: 'idle',
  user: null,
};

export const addUserThunk = createAsyncThunk('user/add-user', async (user: IUser) => {
  return {
    id: nanoid(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
});

export const userBorrowBookThunk = createAsyncThunk(
  'user/user-borrow-book',
  async (bookId: string) => {
    return bookId;
  },
);

export const userReturnBookThunk = createAsyncThunk(
  'user/user-return-book',
  async (bookId: string) => {
    return bookId;
  },
);

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.status = 'received';
        const user = action.payload;
        const role = user.email === 'alexander.sergeev@integrify.io' ? 'admin' : 'visitor';
        state.user = { ...user, role, booksIds: [] };
      })
      .addCase(addUserThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(userBorrowBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userBorrowBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        if (state.user && state.user.booksIds) {
          state?.user?.booksIds.push(action.payload);
        }
      })
      .addCase(userBorrowBookThunk.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(userReturnBookThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userReturnBookThunk.fulfilled, (state, action) => {
        state.status = 'received';
        if (state.user && state.user.booksIds) {
          state.user.booksIds = state.user.booksIds.filter((id) => id !== action.payload);
        }
      })
      .addCase(userReturnBookThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { logoutUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
