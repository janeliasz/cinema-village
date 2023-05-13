import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ShowDate = {
  year: number;
  month: number;
  day: number;
};

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, ShowDate>({
      query: (date) => `${date.day}`,
    }),
  }),
});

export const { useGetShowsByDateQuery } = showsApi;
