import { useCallback, useContext, useMemo, useReducer, useState } from "react";
import { TicketsActions, ticketsReducer } from "./ticketReducer";
import {
  ReservationContext,
  ReservationContextType,
} from "./ReservationContext";
import { PersonalData, SelectedSeat, TicketType } from "../../types";

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [selectedTickets, dispatch] = useReducer(ticketsReducer, [
    { type: TicketType.Normal, numOfTickets: 2 },
  ]);

  const changeTicketType = (rowIdx: number, type: TicketType) => {
    setSelectedSeats([]);

    dispatch({
      type: TicketsActions.CHANGE_TYPE,
      payload: { rowIdx, type },
    });
  };

  const changeNumOfTickets = (rowIdx: number, numOfTickets: number) => {
    setSelectedSeats([]);

    dispatch({
      type: TicketsActions.CHANGE_NUM_OF_TICKETS,
      payload: { rowIdx, numOfTickets },
    });
  };

  const addTicketType = (type: TicketType) => {
    setSelectedSeats([]);

    dispatch({ type: TicketsActions.ADD_TYPE, ticketType: type });
  };

  const removeTicketType = (type: TicketType) => {
    setSelectedSeats([]);

    dispatch({ type: TicketsActions.REMOVE_TYPE, ticketType: type });
  };

  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const selectSeat = useCallback(
    (rowNumber: number, seatNumber: number) => {
      if (
        selectedSeats.find(
          (seat) =>
            seat.rowNumber === rowNumber && seat.seatNumber === seatNumber,
        )
      ) {
        return;
      }

      setSelectedSeats((prev) => [...prev, { rowNumber, seatNumber }]);
    },
    [selectedSeats],
  );

  const deselectSeat = (rowNumber: number, seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.filter(
        (seat) =>
          !(seat.seatNumber === seatNumber && seat.rowNumber === rowNumber),
      ),
    );
  };

  const [personalInfo, setPersonalInfo] = useState<PersonalData>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const contextValue = useMemo(
    () => ({
      selectedTickets,
      changeTicketType,
      changeNumOfTickets,
      addTicketType,
      removeTicketType,
      selectedSeats,
      selectSeat,
      deselectSeat,
      personalInfo,
      setPersonalInfo,
    }),
    [selectedTickets, selectedSeats, selectSeat, personalInfo],
  );

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation(): ReservationContextType {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw Error("Reservation context used outside provider!");
  }
  return ctx;
}

export default ReservationProvider;
