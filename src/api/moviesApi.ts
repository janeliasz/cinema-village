import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
  id: number;
      title: string;
      director: string;
      overview: string;
      releaseDate: string;
      runtime: number;
      posterPath: string;
}

export const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/movies" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovieById: builder.query<unknown, number>({
      query: (id) => `/${id}`,
      providesTags: ["Movies"],
    }),
  }),
});

export const { useGetMovieByIdQuery } = moviesApi;
