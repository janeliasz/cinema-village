import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "../routes/reserve/types";

export type SeatsAvailability = {
  normal: number;
  premium: number;
};

export type ReservationRequest = {
  screeningId: number;
  rowNumber: number;
  seatNumber: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
};

export const showsApi = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Shows", "Rooms"],
  endpoints: (builder) => ({
    getShowsByDate: builder.query<unknown, string>({
      query: (date) => `/screenings/date?date=${date}`,
      providesTags: ["Shows"],
    }),
    getAvailableSeats: builder.query<SeatsAvailability, string>({
      query: (id) => `/screenings/${id}/available-seats`,
      providesTags: ["Rooms"],
    }),
    getRoomById: builder.query<Room, number>({
      query: (id) => `/rooms/${id}`,
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
  useGetAvailableSeatsQuery,
  useGetRoomByIdQuery,
  useReserveMutation,
} = showsApi;
