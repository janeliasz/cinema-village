import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReservationRequest, Room, SeatsAvailability, Show } from "../types";

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Shows", "Rooms"],
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, string>({
      query: (date) => `/screenings/date?date=${date}`,
      providesTags: ["Shows"],
    }),
    getShowById: builder.query<Show, number>({
      query: (id) => `/screenings/${id}`,
      providesTags: ["Shows"],
    }),
    getAvailableSeats: builder.query<SeatsAvailability, string>({
      query: (id) => `/screenings/${id}/available-seats`,
      providesTags: ["Rooms"],
    }),
    getRoomById: builder.query<Room, { roomId: number; screeningId: number }>({
      query: ({ roomId, screeningId }) =>
        `/rooms/${roomId}/screening/${screeningId}`,
      providesTags: ["Rooms"],
    }),
    reserve: builder.mutation<unknown, ReservationRequest>({
      query: (reservationReq) => ({
        url: "/reservations",
        method: "POST",
        body: { ...reservationReq },
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetShowsByDateQuery,
  useGetShowByIdQuery,
  useGetAvailableSeatsQuery,
  useGetRoomByIdQuery,
  useReserveMutation,
} = showsApi;
