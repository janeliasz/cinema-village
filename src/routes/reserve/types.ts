export enum TicketType {
  Normal = "Normal",
  Premium = "Premium",
  Student = "Student",
  Senior = "Senior",
}

export type SelectedTicketType = {
  type: TicketType;
  numOfTickets: number;
};

export type PersonalData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export enum SeatType {
  Normal = "Normal",
  Premium = "Premium",
}
type Seat = {
  id: number;
  seatNumber: number;
  positionInRow: number;
  type: SeatType;
  reserved: boolean;
};

type Row = {
  id: number;
  rowNumber: number;
  shift: boolean;
  seats: Seat[];
};

export type Room = {
  id: number;
  roomNumber: number;
  rows: Row[];
};
