export interface Action {
  contactName: string;
  days: number;
  contactCategory: string;
  note: string;
  goalDays: number;
}

export enum ActionType {
  Past = "past",
  Upcoming = "upcoming",
}
