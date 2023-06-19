import { SelectedTicketType, TicketType } from "../../types";

export enum TicketsActions {
  CHANGE_TYPE = "CHANGE_TYPE",
  CHANGE_NUM_OF_TICKETS = "CHANGE_NUM_OF_TICKETS",
  ADD_TYPE = "ADD_TYPE",
  REMOVE_TYPE = "REMOVE_TYPE",
}

type ChangeTypeAction = {
  type: TicketsActions.CHANGE_TYPE;
  payload: {
    rowIdx: number;
    type: TicketType;
  };
};

type ChangeNumOfTicketsAction = {
  type: TicketsActions.CHANGE_NUM_OF_TICKETS;
  payload: {
    rowIdx: number;
    numOfTickets: number;
  };
};

type AddTypeAction = { type: TicketsActions.ADD_TYPE; ticketType: TicketType };

type RemoveTypeAction = {
  type: TicketsActions.REMOVE_TYPE;
  ticketType: TicketType;
};

type TicketsAction =
  | ChangeTypeAction
  | ChangeNumOfTicketsAction
  | AddTypeAction
  | RemoveTypeAction;

export function ticketsReducer(
  tickets: SelectedTicketType[],
  action: TicketsAction,
) {
  switch (action.type) {
    case TicketsActions.CHANGE_TYPE:
      return tickets.map((ticket, idx) =>
        idx === action.payload.rowIdx
          ? { ...ticket, type: action.payload.type }
          : ticket,
      );
    case TicketsActions.CHANGE_NUM_OF_TICKETS:
      return tickets.map((ticket, idx) =>
        idx === action.payload.rowIdx
          ? { ...ticket, numOfTickets: action.payload.numOfTickets }
          : ticket,
      );
    case TicketsActions.ADD_TYPE:
      return [...tickets, { type: action.ticketType, numOfTickets: 1 }];
    case TicketsActions.REMOVE_TYPE:
      return tickets.filter((ticket) => ticket.type !== action.ticketType);
    default:
      throw Error("Unknown action!");
  }
}
