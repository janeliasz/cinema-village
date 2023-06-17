import { configureStore } from "@reduxjs/toolkit";
import { showsApi } from "./api/showsApi";
import { moviesApi } from "./api/moviesApi";
import { roomsApi } from "./api/roomsApi";

const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware, moviesApi.middleware, roomsApi.middleware),
});

export default store;
