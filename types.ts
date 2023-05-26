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

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
  website: string;
  image?: string;
  category?: string;
  goalDays?: number;
  interests?: string;
  activities?: Array<Activity>;
}

interface Activity {
  note: string;
}
