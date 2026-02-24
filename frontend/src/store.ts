import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import booksReducer from './features/books/booksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: ['your/action/type'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
