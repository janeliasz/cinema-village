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
  Normal = "normal",
  Premium = "premium",
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

export type SelectedSeat = {
  rowNumber: number;
  seatNumber: number;
}

export type Movie = {
  id: number;
      title: string;
      director: string;
      overview: string;
      releaseDate: string;
      runtime: number;
      posterPath: string;
}

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

export type Show = {
  id: number;
  movie: Movie;
  room: Room;
  screeningTime: string;
};