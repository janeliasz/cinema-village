import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "../routes/reserve/types";

export const roomsApi = createApi({
  reducerPath: "rooms",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/rooms" }),
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    getRoomById: builder.query<Room, number>({
      query: (id) => `/${id}`,
      providesTags: ["Rooms"],
    }),
  }),
});

export const { useGetRoomByIdQuery } = roomsApi;
