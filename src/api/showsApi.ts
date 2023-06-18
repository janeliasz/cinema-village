import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/screenings" }),
  tagTypes: ["Shows"],
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, string>({
      query: (date) => `/date?date=${date}`,
      providesTags: ["Shows"],
    }),
  }),
});

export const { useGetShowsByDateQuery } = showsApi;
