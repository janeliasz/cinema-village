import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovieById: builder.query<unknown, number>({
      query: (id) => `/${id}`,
      providesTags: ["Movies"],
    }),
  }),
});

export const { useGetMovieByIdQuery } = moviesApi;
