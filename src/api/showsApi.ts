import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SeatsAvailability = {
  normal: number;
  premium: number;
};

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/screenings" }),
  tagTypes: ["Shows"],
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, string>({
      query: (date) => `/date?date=${date}`,
      providesTags: ["Shows"],
    }),
    getAvailableSeats: builder.query<SeatsAvailability, string>({
      query: (id) => `/${id}/available-seats`,
    }),
  }),
});

export const { useGetShowsByDateQuery, useGetAvailableSeatsQuery } = showsApi;
