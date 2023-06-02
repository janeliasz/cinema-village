import { createContext } from "react";
import { SelectedTicketType, TicketType } from "./ticketReducer";

export type ReservationContextType = {
  selectedTickets: SelectedTicketType[];
  changeTicketType: (rowIdx: number, type: TicketType) => void;
  changeNumOfTickets: (rowIdx: number, numOfTickets: number) => void;
  addTicketType: (ticketType: TicketType) => void;
  removeTicketType: (ticketType: TicketType) => void;
}

export const ReservationContext = createContext<ReservationContextType | null>(null);
