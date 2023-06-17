import { createContext } from "react";
import { PersonalData, SelectedSeat, SelectedTicketType, TicketType } from "./types";

export type ReservationContextType = {
  selectedTickets: SelectedTicketType[];
  changeTicketType: (rowIdx: number, type: TicketType) => void;
  changeNumOfTickets: (rowIdx: number, numOfTickets: number) => void;
  addTicketType: (ticketType: TicketType) => void;
  removeTicketType: (ticketType: TicketType) => void;
  selectedSeats: SelectedSeat[];
  selectSeat: (rowNumber: number, seatNumber: number) => void;
  deselectSeat: (rowNumber: number, seatNumber: number) => void;
  personalInfo: PersonalData;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalData>>;
};

export const ReservationContext = createContext<ReservationContextType | null>(
  null,
);
