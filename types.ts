export interface Action {
  contactName: string;
  days: number;
  contactCategory: string;
  note: string;
}

export enum ActionType {
  Past = "past",
  Upcoming = "upcoming",
}
