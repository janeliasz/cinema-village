import { useContext, useMemo, useReducer, useState } from "react";
import { TicketsActions, ticketsReducer } from "./ticketReducer";
import { ReservationContext, ReservationContextType } from "./ReservationContext";
import { PersonalData, TicketType } from "./types";

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
      personalInfo,
      setPersonalInfo,
    }),
    [selectedTickets, personalInfo],
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
