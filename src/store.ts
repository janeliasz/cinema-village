import { configureStore } from "@reduxjs/toolkit";
import { showsApi } from "./api/showsApi";
import { moviesApi } from "./api/moviesApi";

const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware, moviesApi.middleware),
});

export default store;
