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