import { configureStore } from '@reduxjs/toolkit'
import api from './api/api'

export const store = configureStore({
  reducer: {
    // [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
})