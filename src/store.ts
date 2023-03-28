import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import * as api from '@/api';
import { authorsReducer } from '@/features/authors/authorsSlice';
import { booksReducer } from '@/features/books/booksSlice';
import { usersReducer } from '@/features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer,
    authors: authorsReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
