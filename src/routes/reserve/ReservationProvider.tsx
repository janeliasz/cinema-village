import { useContext, useMemo, useReducer } from "react";
import {
  ReservationContext,
  ReservationContextType,
} from "./reservationContext";
import { TicketType, TicketsActions, ticketsReducer } from "./ticketReducer";

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [selectedTickets, dispatch] = useReducer(ticketsReducer, [
    { type: TicketType.Normal, numOfTickets: 2 },
  ]);

  const changeTicketType = (rowIdx: number, type: TicketType) => {
    dispatch({
      type: TicketsActions.CHANGE_TYPE,
      payload: { rowIdx, type },
    });
  };

  const changeNumOfTickets = (rowIdx: number, numOfTickets: number) => {
    dispatch({
      type: TicketsActions.CHANGE_NUM_OF_TICKETS,
      payload: { rowIdx, numOfTickets },
    });
  };

  const addTicketType = (type: TicketType) => {
    dispatch({ type: TicketsActions.ADD_TYPE, ticketType: type });
  };

  const removeTicketType = (type: TicketType) => {
    dispatch({ type: TicketsActions.REMOVE_TYPE, ticketType: type });
  };

  const contextValue = useMemo(
    () => ({
      selectedTickets,
      changeTicketType,
      changeNumOfTickets,
      addTicketType,
      removeTicketType,
    }),
    [selectedTickets],
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
