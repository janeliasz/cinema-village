import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ShowDate = {
  year: number;
  month: number;
  day: number;
};

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  tagTypes: ["Shows"],
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, ShowDate>({
      query: (date) => `?limit=5&skip=${date.day * 0}`,
      providesTags: ["Shows"],
    }),
  }),
});

export const { useGetShowsByDateQuery } = showsApi;
